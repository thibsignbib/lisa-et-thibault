"use client"

import { useEffect, useState } from "react"

export default function HomeClient() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Chargement polices + image
    const fontPromise = document.fonts.ready

    const image = new Image()
    image.src = "/lisathibaultT.png"
    const imagePromise = new Promise((resolve) => {
      image.onload = resolve
      image.onerror = resolve
    })

    Promise.all([fontPromise, imagePromise]).then(() => {
      setIsReady(true)
    })
  }, [])

  if (!isReady) {
    return (
      <main className="fixed inset-0 flex items-center justify-center bg-[#fdfaf5] z-50">
        <p className="text-xl text-kgWildways text-center">Chargement...</p>
      </main>
    )
  }

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center text-[#1B3A2F] p-6 space-y-8 transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      <img
        src="/lisathibaultT.png"
        alt="Lisa & Thibault"
        className="homepagepicture h-auto"
      />
      
      <h1 className="text-wedding text-wedding-home">
        Lisa & Thibault
      </h1>

      <div className="content-block">
        <p className="text-kgWildways text-lg leading-relaxed backdrop-blur-sm p-4 rounded">
          Le mariage approche ! <br /><br />
          Nous avons hâte de vous retrouver le 06 juin 2026 à 14h à la mairie de Cusset. 
          Cette page sera mise à jour avec tous les détails pratiques (accès, horaires, logistique) 
          pour vous aider à préparer ce beau weekend.
        </p>
      </div>
    </main>
  )
}
