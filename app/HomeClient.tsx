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
          Nous avons hâte de vous retrouver pour ce weekend si particulier pour nous.<br />
          Cette page vous donnera tous les détails pratiques (accès, horaires, logistique) pour vous aider à le préparer !
          <br /><br />
          Nous vous attendons le vendredi 5 juin à partir de 14h au Domaine de la Saigne, et les festivités dureront jusqu'au dimanche 7 juin à 15h.<br />Un déroulé complet du weekend vous sera distribué à votre arrivée.
          <br /><br />
          Un hébergement est déjà prévu pour vous, soit sur le domaine, soit dans des gîtes très proches. Vous n'avez pas à apporter de linge de lit, en revanche le linge de toilette n'est pas fourni. 
          <br /><br />
          <b>Vendredi 05 juin :</b> aucune cérémonie n'est prévue l'après-midi du vendredi qui est dédiée aux retrouvailles. De belles balades sont aussi accessibles aux alentours du domaine.<br />
          Le soir, nous nous occuperons du barbecue, et nous vous proposons d'apporter un petit quelque chose pour l'agrémenter (salade, accompagnement, dessert, ...).<br />Vous n'avez pas à prévoir de nourriture pour les autres repas du weekend.
          <br /><br />
          <b>Samedi 06 juin :</b> le mariage civil aura lieu à la mairie de Cusset à 14h, s'en suivra une cérémonie laïque au domaine, entre 15h et 16h. Puis cocktail, repas et soirée jusqu'au bout de la nuit !
          <br /><br />
          <b>Dimanche 07 juin :</b> un brunch sera servi en fin de matinée.
          <br /><br />
          <b>Adresse du domaine: 6 rue de la Saigne, 03300 Creuzier-le-Vieux.</b>
        </p>
      </div>
    </main>
  )
}
