"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular login exitoso
    router.push("/profiles")
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />

      {/* Netflix-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6">
          <div className="flex items-center">
            <h1 className="text-red-600 text-3xl font-bold tracking-wider">GHOSTCH4NFLIX</h1>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
              <h2 className="text-white text-3xl font-semibold mb-8"></h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm">
                    Email o número de teléfono
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 h-12"
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 h-12"
                    placeholder="Tu contraseña"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12 text-base transition-colors duration-200"
                >
                  Iniciar sesión
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-400">
                    <input type="checkbox" className="mr-2 accent-red-600" />
                    Recuérdame
                  </label>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    ¿Necesitas ayuda?
                  </a>
                </div>
              </form>

              <div className="mt-8 text-gray-400 text-sm">
                <p>
                  ¿Primera vez en GHOSTCH4NFLIX?{" "}
                  <a href="#" className="text-white hover:underline">
                    Suscríbete ahora
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
