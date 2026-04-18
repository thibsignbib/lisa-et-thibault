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
          Nous avons hâte de vous retrouver pour ce weekend si particulier pour nous. 
          Cette page vous donnera tous les détails pratiques (accès, horaires, logistique) pour vous aider à le préparer !
          <br /><br />
          Nous vous attendons le vendredi 5 juin à partir de 14h au Domaine de la Saigne, 6 rue de la Saigne à Creuzier-le-Vieux (03300).<br />
          Aucune cérémonie spécifique n'est prévue l'après-midi du vendredi; vous pourrez profiter des lieux avec nous, de balades sont aussi disponibles aux alentours du domaine.<br />
          Le soir, nous nous occupons du barbecue, et nous vous proposons d'apporter un petit quelque chose pour l'agrémenter (salade, accompagnement, dessert, ...).
          <br />
        </p>
      </div>
    </main>
  )
}
