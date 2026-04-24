"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"

export default function HomeClient() {
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()

  // On détermine la langue en fonction de l'URL
  const isGerman = pathname === "/guten-rutsch"

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

  // Logique des messages personnalisés d'hébergement
  const getAccommodationMessage = () => {
    if (isGerman) return "Für euch ist eine Unterkunft direkt vor Ort oder in unmittelbarer Nähe geplant. Ihr müsst lediglich eure eigenen Handtücher mitbringen.";
    
    if (pathname === "/infos-camping") {
      return "Vous avez la possibilité de garer votre camping-car ou van directement dans le domaine. Il n'y a malheureusement pas d'aire de branchement (eau, elec), mais vous aurez la possibilité de vous doucher dans le gîte ou d'utiliser les frigos si nécessaire.";
    }
    if (pathname === "/infos-gite") {
      return "Un hébergement est déjà prévu pour vous dans un gîte proche du domaine. Il vous suffit simplement d'apporter votre linge de toilette.";
    }
    if (pathname === "/infos-domaine") {
      return "Un hébergement est déjà prévu pour vous sur place. Il vous suffit simplement d'apporter votre linge de toilette.";
    }
    if (pathname === "/infos-copains") {
      return "Un hébergement est déjà prévu pour vous sur place. Il faudra apporter vos duvets, oreillers et linge de toilette svp.";
    }
    return "Cliquez sur le lien que nous vous avons envoyé pour accéder aux détails de votre logement.";
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
          
          {/* INTRO */}
          <p>
            {isGerman ? (
              <>Die Hochzeit rückt näher! <br /><br /> Wir freuen uns sehr, euch an diesem für uns so besonderen Wochenende wiederzusehen. Diese Seite gibt euch alle praktischen Details (Anfahrt, Zeiten, Logistik), um euch bei der Vorbereitung zu helfen!</>
            ) : (
              <>Le mariage approche ! <br /><br /> Nous avons hâte de vous retrouver pour ce weekend si particulier pour nous. Cette page vous donnera tous les détails pratiques (accès, horaires, logistique) pour vous aider à le préparer !</>
            )}
          </p>

          {/* ACCUEIL VENDREDI */}
          <p>
            {isGerman ? (
              <>Wir erwarten euch am Freitag, den 5. Juni ab 14 Uhr auf der Domaine de la Saigne. Die Feierlichkeiten dauern bis Sonntag, den 7. Juni um 15 Uhr. Ein detaillierter Ablauf des Wochenendes wird euch bei eurer Ankunft ausgehändigt.</>
            ) : (
              <>Nous vous attendons le vendredi 5 juin à partir de 14h au Domaine de la Saigne, et les festivités dureront jusqu'au dimanche 7 juin à 15h. Un déroulé complet du weekend vous sera distribué à votre arrivée.</>
            )}
          </p>

          {/* LOGEMENT (DYNAMIQUE) */}
          <p className="font-bold border-l-4 border-[#1B3A2F] pl-4 py-1 italic bg-white/20">
            {getAccommodationMessage()}
          </p>

          {/* VENDREDI SOIR */}
          <p>
            {isGerman ? (
              <><b>Freitag, 5. Juni:</b> Am Freitagnachmittag ist keine Zeremonie geplant, er ist dem Wiedersehen gewidmet. In der Umgebung des Anwesens gibt es schöne Spazierwege. Am Abend schlagen wir vor, dass jeder eine Kleinigkeit mitbringt (Salat, Quiche, Obst, Dessert...). Wir kümmern uns um das Fleisch für den Grill. Für die anderen Mahlzeiten des Wochenendes müsst ihr nichts einplanen.</>
            ) : (
              <><b>Vendredi 05 juin :</b> aucune cérémonie n'est prévue l'après-midi du vendredi qui est dédiée aux retrouvailles. De belles balades sont aussi accessibles aux alentours du domaine. Le soir, nous vous proposons d'apporter un petit quelque chose (salade, cake/quiche, fruits, dessert, ...). Nous nous occupons de la viande du barbecue. Vous n'avez pas à prévoir de nourriture pour les autres repas du weekend.</>
            )}
          </p>

          {/* SAMEDI */}
          <p>
            {isGerman ? (
              <><b>Samstag, 6. Juni:</b> Die standesamtliche Trauung findet um 14 Uhr im Rathaus von Cusset statt, gefolgt von einer freien Zeremonie auf dem Anwesen zwischen 15 und 16 Uhr. Danach Cocktail, Essen und Party bis tief in die Nacht!</>
            ) : (
              <><b>Samedi 06 juin :</b> le mariage civil aura lieu à la mairie de Cusset à 14h, s'en suivra une cérémonie laïque au domaine, entre 15h et 16h. Puis cocktail, repas et soirée jusqu'au bout de la nuit !</>
            )}
          </p>

          {/* DIMANCHE */}
          <p>
            {isGerman ? (
              <><b>Sonntag, 7. Juni:</b> Ein Brunch wird am späten Vormittag serviert.</>
            ) : (
              <><b>Dimanche 07 juin :</b> un brunch sera servi en fin de matinée.</>
            )}
          </p>

          {/* SECTION WHATSAPP (Cachée en Allemand) */}
          {!isGerman && (
            <div className="bg-[#1B3A2F]/5 border border-[#1B3A2F]/10 rounded-xl p-5 text-center space-y-3">
              <p className="text-base sm:text-lg">
                Pour faciliter vos déplacements (gare de Vichy) ou mutualiser les trajets, un groupe WhatsApp a été créé :
              </p>
              <a 
                href="https://chat.whatsapp.com/BcGD2dy9pqs4UBTYjHa3Pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1B3A2F] text-[#fdfaf5] px-5 py-2 rounded-full text-base hover:bg-opacity-90 transition-all shadow-sm"
              >
                <MessageCircle size={18} />
                Rejoindre le groupe Covoiturage
              </a>
            </div>
          )}

          <p className="pt-4 text-center border-t border-[#1B3A2F]/20">
            <b>{isGerman ? "Adresse des Anwesens:" : "Adresse du domaine :"}</b> 6 rue de la Saigne, 03300 Creuzier-le-Vieux.
          </p>
        </div>
      </div>
    </main>
  )
}