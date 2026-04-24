"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react" // Pour la petite icône WhatsApp

export default function HomeClient() {
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
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

  // Logique des messages personnalisés
  const getAccommodationMessage = () => {
    if (pathname === "/infos-camping") {
      return "Vous avez la possibilité de garer votre camping-car ou van directement dans le domaine. Il n'y a malheureusement pas d'aire de branchement (eau, elec), mais vous aurez la possibilité de vous doucher dans le gîte ou d'utiliser les frigos si nécessaire.";
    }
    if (pathname === "/infos-gite") {
      return "Un hébergement est déjà prévu pour vous dans un gite proche du domaine. Il vous suffit simplement d'apporter votre linge de toilette.";
    }
    if (pathname === "/infos-domaine") {
      return "Un hébergement est déjà prévu pour vous sur place. Il vous suffit simplement d'apporter votre linge de toilette.";
    }
    if (pathname === "/infos-copains"){
      return "Un hébergement est déjà prévu pour vous sur place. Il faudra apporter vos duvets, oreillers et linge de toilette svp.";
    }
    if (pathname === "/guten-rutsch"){
      return "Wochenendprogramm"
    }
    return "Cliquez sur le lien que nous vous avons envoyé pour accéder au détails de votre logement et au linge nécessaire.";
  };

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
        <div className="text-kgWildways leading-relaxed backdrop-blur-sm p-4 rounded space-y-4">
          <p>
            Le mariage approche ! <br /><br />
            Nous avons hâte de vous retrouver pour ce weekend si particulier pour nous.<br />
            Cette page vous donnera tous les détails pratiques (accès, horaires, logistique) pour vous aider à le préparer !
          </p>

          <p>
            Nous vous attendons le vendredi 5 juin à partir de 14h au Domaine de la Saigne, et les festivités dureront jusqu'au dimanche 7 juin à 15h.<br />
            Un déroulé complet du weekend vous sera distribué à votre arrivée.
          </p>

          <p className="font-bold border-l-4 border-[#1B3A2F] pl-4 py-1 italic bg-white/20">
            {getAccommodationMessage()}
          </p>

          <p>
            <b>Vendredi 05 juin :</b> aucune cérémonie n'est prévue l'après-midi du vendredi qui est dédiée aux retrouvailles. De belles balades sont aussi accessibles aux alentours du domaine.<br />
            Le soir, nous vous proposons d'apporter un petit quelque chose (salade, cake/quiche, fruits, dessert, ...). Nous nous occupons de la viande du barbecue.<br />
            Vous n'avez pas à prévoir de nourriture pour les autres repas du weekend.
          </p>

          <p>
            <b>Samedi 06 juin :</b> le mariage civil aura lieu à la mairie de Cusset à 14h, s'en suivra une cérémonie laïque au domaine, entre 15h et 16h. Puis cocktail, repas et soirée jusqu'au bout de la nuit !
          </p>

          <p>
            <b>Dimanche 07 juin :</b> un brunch sera servi en fin de matinée.
          </p>

          {/* SECTION WHATSAPP */}
          <div className="bg-[#1B3A2F]/5 border border-[#1B3A2F]/10 rounded-xl p-5 text-center space-y-3">
            <p className="text-base sm:text-lg">
              Comme vous êtes plusieurs à venir en train, un groupe WhatsApp a été créé pour mutualiser les trajets entre la gare et le domaine :
            </p>
            <a 
              href="https://chat.whatsapp.com/BcGD2dy9pqs4UBTYjHa3Pl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B3A2F] text-[#fdfaf5] px-5 py-2 rounded-full text-base hover:bg-opacity-90 transition-all shadow-sm"
            >
              <MessageCircle size={18} />
              Rejoindre le groupe
            </a>
          </div>

          <p className="pt-4 text-center border-t border-[#1B3A2F]/20">
            <b>Adresse du domaine :</b> 6 rue de la Saigne, 03300 Creuzier-le-Vieux.
          </p>
        </div>
      </div>
    </main>
  )
}