"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Upload } from "lucide-react"

interface Profile {
  id: string
  name: string
  avatar: string | ArrayBuffer | null
  isKids: boolean
}

export default function ProfilesPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [newName, setNewName] = useState("")

  // Cargar perfiles al iniciar
  useEffect(() => {
    const savedProfiles = localStorage.getItem("profiles")
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    } else {
      // Perfiles por defecto
      const defaultProfiles = [
        { id: "1", name: "Juan", avatar: "https://i.pinimg.com/originals/5e/ca/27/5eca2762d126defa7680aff778bf1df2.jpg", isKids: false },
        { id: "2", name: "María", avatar: "https://play-lh.googleusercontent.com/CXhlLikzEjH7MOlL1RCTd_QreZDovWCY4nt7JGW_UluAFlSYs2zINPqu-xcFrIAc2uXm=w526-h296-rw", isKids: false },
        { id: "3", name: "Niños", avatar: "https://preview.redd.it/laqum97z7i581.png?width=1920&format=png&auto=webp&s=3394cab2625bfafddd7b7bf6954d7fad48a70fa3", isKids: true },
      ]
      setProfiles(defaultProfiles)
      localStorage.setItem("profiles", JSON.stringify(defaultProfiles))
    }
  }, [])

  const handleSelectProfile = (profile: Profile) => {
    localStorage.setItem("selectedProfile", JSON.stringify(profile))
    router.push("/browse")
  }

  const handleAddProfile = () => {
    if (profiles.length >= 5) return

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: `Perfil ${profiles.length + 1}`,
      avatar: null,
      isKids: false,
    }
    setEditingProfile(newProfile)
    setNewName(newProfile.name)
  }

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile)
    setNewName(profile.name)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (editingProfile) {
          setEditingProfile({
            ...editingProfile,
            avatar: event.target?.result || null
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfile = () => {
    if (!editingProfile) return

    const updatedProfile = {
      ...editingProfile,
      name: newName.trim() || editingProfile.name
    }

    let updatedProfiles
    if (profiles.some(p => p.id === editingProfile.id)) {
      updatedProfiles = profiles.map(p => 
        p.id === editingProfile.id ? updatedProfile : p
      )
    } else {
      updatedProfiles = [...profiles, updatedProfile]
    }

    setProfiles(updatedProfiles)
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles))
    setEditingProfile(null)
  }

  const deleteProfile = (id: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== id)
    setProfiles(updatedProfiles)
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles))
    setEditingProfile(null)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {editingProfile ? (
        <div className="relative z-10 bg-gray-900 p-8 rounded-lg max-w-md w-full">
          <h2 className="text-white text-2xl mb-6 text-center">
            {profiles.some(p => p.id === editingProfile.id) ? "Editar perfil" : "Crear perfil"}
          </h2>
          
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
              {editingProfile.avatar ? (
                typeof editingProfile.avatar === 'string' ? (
                  <img 
                    src={editingProfile.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={editingProfile.avatar.toString()} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-6 h-6 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <label className="text-gray-400 mb-1">Cambiar imagen</label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Nombre</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
            />
          </div>

          <div className="flex justify-between">
            {profiles.some(p => p.id === editingProfile.id) && (
              <Button
                variant="destructive"
                onClick={() => deleteProfile(editingProfile.id)}
              >
                Eliminar
              </Button>
            )}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setEditingProfile(null)}
              >
                Cancelar
              </Button>
              <Button onClick={saveProfile}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-black" />

          <div className="relative z-10 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-light mb-8">¿Quién está viendo ahora?</h1>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative">
                    <div 
                      onClick={() => handleSelectProfile(profile)}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-white transition-colors duration-200"
                    >
                      {profile.avatar ? (
                        typeof profile.avatar === 'string' ? (
                          <img 
                            src={profile.avatar} 
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src={profile.avatar.toString()} 
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white text-4xl">
                          {profile.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditProfile(profile)
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <p className="text-white text-lg md:text-xl mt-4 group-hover:text-gray-300 transition-colors duration-200">
                    {profile.name}
                  </p>
                  {profile.isKids && <p className="text-yellow-500 text-sm mt-1">NIÑOS</p>}
                </div>
              ))}

              {profiles.length < 5 && (
                <div
                  onClick={handleAddProfile}
                  className="group cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-white transition-colors duration-200">
                    <Plus className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <p className="text-gray-400 text-lg md:text-xl mt-4 group-hover:text-white transition-colors duration-200">
                    Agregar perfil
                  </p>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              className="border-gray-600 text-gray-400 hover:text-white hover:border-white bg-transparent"
            >
              Administrar perfiles
            </Button>
          </div>
        </>
      )}
    </div>
  )
}