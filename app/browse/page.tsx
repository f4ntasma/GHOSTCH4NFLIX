"use client"

import { useState, useEffect } from "react"
import { Search, Bell, ChevronDown, Play, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import image from "next/image"

interface Content {
  id: string
  title: string
  image: string
  type: "movie" | "series" | "documentary" | "tv"
  genre: string
  year: number
  rating: string
}

const mockContent: Content[] = [
  {
    id: "1",
    title: "50 Sombras de Grey",
    image: "https://pics.filmaffinity.com/fifty_shades_of_grey-619064266-large.jpg",
    type: "movie",
    genre: "Sci-Fi",
    year: 2022,
    rating: "19+",
  },
  {
    id: "2",
    title: "JOKER",
    image: "https://hips.hearstapps.com/hmg-prod/images/2yor0tcei77qmkgjgvjhkwlefic-6683e9a043944.jpg?crop=1xw:1xh;center,top&resize=980:*",
    type: "movie",
    genre: "Drama",
    year: 2023,
    rating: "18+",
  },
  {
    id: "3",
    title: "Guasón 2",
    image: "https://moviecrazyplanet.com/wp-content/uploads/2024/10/Guason-2-Folie-A-Deux-01.jpg",
    type: "movie",
    genre: "Acción",
    year: 2023,
    rating: "18+",
  },
  {
    id: "4",
    title: "Karate Kid",
    image: "https://www.andesfilms.com.pe/wp-content/thumbgen_cache/fc5909e63a4a0ef1b1b171107ab0c43e.jpg",
    type: "movie",
    genre: "Naturaleza",
    year: 2023,
    rating: "12+",
  },
  {
    id: "5",
    title: "Minecraft",
    image: "https://es.web.img3.acsta.net/c_300_300/img/6d/7e/6d7ebaf55a56605c074747f74824fb99.jpg",
    type: "movie",
    genre: "Fantasía",
    year: 2023,
    rating: "15+",
  },
  {
    id: "6",
    title: "Moana 2",
    image: "https://e-ce.americatv.com.pe/moana-2-estrena-nuevo-avance-0x0-504562.jpg",
    type: "movie",
    genre: "Acción",
    year: 2023,
    rating: "5+",
  },
  {
    id: "7",
    title: "Lilo & Stich",
    image: "https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002370?referenceScheme=HeadOffice&allowPlaceHolder=true",
    type: "movie",
    genre: "Animación & Comedia",
    year: 2025,
    rating: "10+",
  },
  {
    id: "8",
    title: "El Juego del Calamar 3",
    image: "https://www.somosxbox.com/wp-content/uploads/2025/01/el-juego-del-calamar-3-poster-somosxbox.jpeg",
    type: "series",
    genre: "acción",
    year: 2025,
    rating: "17+",
  },
  {
    id: "9",
    title: "Sonríe",
    image: "https://lh3.googleusercontent.com/k9i68Finux-IdhcgQEtzukHhImaGFdgOv-rS4ksfBKPG5d_l5xbUGLspry7YReB_DHrSJQpxrPNjVssxwz_ngKp9rbzS5z4yvj-5HVzzv3HVC0W-c2GpwCGJDT-OIV2CAX1RJZkjIqc=w2400",
    type: "movie",
    genre: "acción",
    year: 2025,
    rating: "18+",
  },
  {
    id: "10",
    title: "Superman",
    image: "https://cinestar-files.obs.la-south-2.myhuaweicloud.com/movies/1752159419.jpg",
    type: "movie",
    genre: "acción",
    year: 2025,
    rating: "16+",
  },
  {
    id: "11",
    title: "Padre No Hay Más Que Uno 5",
    image: "https://es.web.img3.acsta.net/c_310_420/img/2b/39/2b392ee2684a35b277bf3e24a56b02c9.jpg",
    type: "movie",
    genre: "familia",
    year: 2025,
    rating: "6+",
  },
  {
    id: "12",
    title: "Coraline",
    image: "https://i.redd.it/my-favorite-animated-movie-posters-v0-mqxm33m2ofie1.jpg?width=1185&format=pjpg&auto=webp&s=33d476d63e09b07d26e562f8e769f0a1eb345770",
    type: "movie",
    genre: "acción",
    year: 2025,
    rating: "6+",
  },
  {
    id: "13",
    title: "Ballerina",
    image: "https://preview.redd.it/theatrical-watches-this-week-the-materialists-ballerina-v0-s8h6yzm8lt6f1.png?width=640&crop=smart&auto=webp&s=1e89487adf8615f67eacb8db62b4a3d346d5b39b",
    type: "movie",
    genre: "acción",
    year: 2025,
    rating: "16+",
  },
  {
    id: "14",
    title: "Los Cuatro Fantásticos: Primeros Pasos",
    image: "https://media.filmelier.com/images/tit/28579/poster/the-fantastic-four-first-steps61874.webp",
    type: "movie",
    genre: "acción",
    year: 2025,
    rating: "10+",
  },
  {
    id: "15",
    title: "Until Dawn",
    image: "https://es.web.img3.acsta.net/img/70/f9/70f9230275ddd2813d6aab31ca89146f.jpg",
    type: "movie",
    genre: "terror",
    year: 2025,
    rating: "18+",
  },
  {
    id: "16",
    title: "Demon Slayer",
    image: "https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002431?referenceScheme=HeadOffice&allowPlaceHolder=true",
    type: "series",
    genre: "acción",
    year: 2025,
    rating: "16+",
  },
  {
    id: "17",
    title: "Arcane",
    image: "https://m.media-amazon.com/images/M/MV5BOWJhYjdjNWEtMWFmNC00ZjNkLThlZGEtN2NkM2U3NTVmMjZkXkEyXkFqcGc@._V1_.jpg",
    type: "series",
    genre: "acción",
    year: 2025,
    rating: "17+",
  },
  {
    id: "18",
    title: "Rick and Morty",
    image: "https://i0.wp.com/tomatazos.buscafs.com/2025/05/Rick-y-Morty-T8-Poster-2-1-scaled.jpeg?fit=2046,2560&quality=75&strip=all",
    type: "series",
    genre: "acción",
    year: 2025,
    rating: "12+",
  },
]

const categories = [
  { name: "Tendencias", filter: () => true },
  { name: "Películas", filter: (item: Content) => item.type === "movie" },
  { name: "Series", filter: (item: Content) => item.type === "series" },
  { name: "Documentales", filter: (item: Content) => item.type === "documentary" },
  { name: "Mi Lista", filter: () => true },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tendencias")
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem("selectedProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const filteredContent = mockContent.filter((item) => {
    const category = categories.find((cat) => cat.name === selectedCategory)
    const matchesCategory = category ? category.filter(item) : true
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredContent = mockContent[0]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
<header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center space-x-8">
      <h1 className="text-red-600 text-2xl font-bold tracking-wider">GHOSTCH4NFLIX</h1>
      <nav className="hidden md:flex space-x-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`text-sm transition-colors duration-200 ${
              selectedCategory === category.name ? "text-white font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>

    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Títulos, personas, géneros"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-black/50 border-gray-600 text-white placeholder-gray-400 pl-10 w-64 focus:border-white"
        />
      </div>
      <Bell className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
      <div className="flex items-center space-x-2 cursor-pointer">
        {profile?.avatar ? (
          typeof profile.avatar === 'string' ? (
            <img 
              src={profile.avatar} 
              alt="Avatar del perfil"
              className="w-8 h-8 rounded object-cover"
            />
          ) : (
            <img 
              src={profile.avatar.toString()} 
              alt="Avatar del perfil"
              className="w-8 h-8 rounded object-cover"
            />
          )
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center text-sm">
            {profile?.name?.charAt(0) || "🐮"}
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
</header>

      {/* Hero Section - Arcane */}
<section className="relative h-screen flex items-center">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url('https://i.pinimg.com/originals/25/2d/36/252d36a0ed1aa8b56d66718390bb7743.gif')`,
    }}
  />

  <div className="relative z-10 px-6 max-w-2xl">
    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-2xl">Arcane</h1>
    <p className="text-lg md:text-xl mb-6 text-gray-200 drop-shadow-lg">
      En la desgarrada ciudad de Piltover y su sombrío submundo, Zaun, dos hermanas luchan en bandos opuestos de una guerra entre magia, tecnología y ambición desmedida.
    </p>
    <div className="flex space-x-4">
      <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold flex items-center space-x-2">
        <Play className="w-5 h-5 fill-current" />
        <span>Reproducir</span>
      </Button>
      <Button
        variant="outline"
        className="border-gray-400 text-white hover:border-white bg-black/50 px-8 py-3 text-lg font-semibold flex items-center space-x-2"
      >
        <Info className="w-5 h-5" />
        <span>Más información</span>
      </Button>
    </div>
  </div>
</section>

      {/* Content Sections */}
      <section className="px-6 pb-20 -mt-32 relative z-20">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">{selectedCategory}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="group cursor-pointer transition-transform duration-300 hover:scale-105">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image || "https://www.nintenderos.com/wp-content/uploads/2024/10/arcane-2-header.jpg"}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-xs">{item.year}</span>
                        <span className="text-gray-300 text-xs">{item.rating}</span>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Play className="w-4 h-4 text-black fill-current" />
                        </button>
                        <button className="w-8 h-8 bg-black/50 border border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional content rows */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Populares en GhostCh4nFlix</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockContent.slice(0, 6).map((item) => (
                <div
                  key={`popular-${item.id}`}
                  className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Continuar viendo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockContent.slice(2, 8).map((item) => (
                <div
                  key={`continue-${item.id}`}
                  className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                      <div className="h-full bg-red-600 w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
