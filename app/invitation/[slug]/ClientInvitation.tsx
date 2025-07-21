"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-browser"
import { toast } from "sonner"
import { Info } from "lucide-react";

interface Guest {
  id: number
  slug: string
  names: string[]
  type: string
  number_of_persons: number
  presences: boolean[]
  presence_number: number
  regime_alimentaire: string[]
  vendredi: boolean[]
  samedi: boolean[]
  dimanche: boolean[]
}

export default function ClientInvitation({ slug }: { slug: string }) {
  const router = useRouter()
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)

  const [presences, setPresences] = useState<boolean[]>([])
  const [regimes, setRegimes] = useState<string[]>([])
  const [vendredi, setVendredi] = useState<boolean[]>([])
  const [samedi, setSamedi] = useState<boolean[]>([])
  const [dimanche, setDimanche] = useState<boolean[]>([])
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle")

  useEffect(() => {
    async function fetchGuest() {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", slug)
        .single<Guest>()

      if (!data || error) {
        router.push("/404")
      } else {
        setGuest(data)
        setPresences(data.presences ?? Array(data.names.length).fill(null))
        setRegimes(data.regime_alimentaire ?? Array(data.names.length).fill(""))
        setVendredi(data.vendredi ?? Array(data.names.length).fill(false))
        setSamedi(data.samedi ?? Array(data.names.length).fill(false))
        setDimanche(data.dimanche ?? Array(data.names.length).fill(false))
        setLoading(false)
      }
    }

    fetchGuest()
  }, [slug, router])

  async function handleSubmit() {
    if (!guest) return
    setStatus("saving")

    const presence_number = presences.filter(Boolean).length

    const { error } = await supabase.from("guests").update({
      presences,
      regime_alimentaire: regimes,
      vendredi,
      samedi,
      dimanche,
      presence_number,
    }).eq("id", guest.id)

    if (error) {
      console.error("Erreur de mise à jour :", error)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
      setStatus("error")
    } else {
      toast.success("Merci ! Vos réponses ont bien été enregistrées.")
      setStatus("success")
    }
  }

  if (loading) return <p className="text-center mt-10">Chargement...</p>
  if (!guest) return null

  return (
  <main className="min-h-screen text-[#1B3A2F] p-6 max-w-3xl mx-auto space-y-10">
    <h1 className="text-wedding">Lisa & Thibault</h1>
      <h1 className="text-3xl text-kgWildways-title font-medium text-center tracking-tight">
        {guest.names.join(", ")},
      </h1>

      <p className="text-kgWildways text-lg leading-relaxed backdrop-blur-sm p-4 rounded">
         Nous avons le bonheur de vous convier à notre mariage qui aura lieu le 6/6/2026 à 14 heures à la mairie de Cusset. <br /><br />

        Et comme le temps passe trop vite quand on est entouré de ceux qu’on aime, nous serions vraiment heureux de vous accueillir dès le vendredi 5 juin, jusqu’au dimanche 7. 
        Un hébergement est donc prévu pour vous sur le lieu des festivités. <br /><br />

        Le formulaire ci-dessous nous aidera à tout préparer, pourriez-vous le remplir d’ici le 1er Septembre svp ? <br /><br />

        <strong>Rendez-vous au Domaine de la Saigne, 6 Rue de la Saigne, 03300 Creuzier-le-Vieux.</strong>
      </p>

    {guest.names.map((name, i) => (
      <section key={i} className="rounded-2xl border border-gray-200 p-6 bg-white/90 shadow-md space-y-6">
        <h3 className="text-xl font-semibold">{name}</h3>

        <fieldset className="space-y-2">
          <legend className="font-medium">Je confirme ma présence</legend>
          <div className="flex gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={`presence-${i}`}
                checked={presences[i] === true}
                onChange={() => {
                  const copy = [...presences]; copy[i] = true; setPresences(copy)
                }}
                className="accent-[#1B3A2F]"
              />
              Oui
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={`presence-${i}`}
                checked={presences[i] === false}
                onChange={() => {
                  const copy = [...presences]; copy[i] = false; setPresences(copy)
                }}
                className="accent-[#1B3A2F]"
              />
              Non
            </label>
          </div>
        </fieldset>


    {presences[i] === true && (
      <>
        <div className="space-y-6 pt-2">
      {/* Type de repas */}
      <fieldset className="space-y-2">
        <legend className="font-medium">Type de repas</legend>
        <div className="flex gap-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={`regime-${i}`}
              value="vege"
              checked={regimes[i] === "vege"}
              onChange={() => {
                const copy = [...regimes]; copy[i] = "vege"; setRegimes(copy)
              }}
              className="accent-[#1B3A2F]"
            />
            Végétarien
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name={`regime-${i}`}
              value="non-vege"
              checked={regimes[i] === "non-vege"}
              onChange={() => {
                const copy = [...regimes]; copy[i] = "non-vege"; setRegimes(copy)
              }}
              className="accent-[#1B3A2F]"
            />
            Non végétarien
          </label>
        </div>
      </fieldset>

      {/* Présence par jour */}
      <fieldset className="space-y-2">
        <legend className="font-medium">Je serai là...</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={vendredi[i]}
              onChange={(e) => {
                const copy = [...vendredi]; copy[i] = e.target.checked; setVendredi(copy)
              }}
              className="accent-[#1B3A2F]"
            />
            La nuit du vendredi
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={samedi[i]}
              onChange={(e) => {
                const copy = [...samedi]; copy[i] = e.target.checked; setSamedi(copy)
              }}
              className="accent-[#1B3A2F]"
            />
            La nuit du samedi
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={dimanche[i]}
              onChange={(e) => {
                const copy = [...dimanche]; copy[i] = e.target.checked; setDimanche(copy)
              }}
              className="accent-[#1B3A2F]"
            />
            Le brunch du dimanche midi
          </label>
        </div>
      </fieldset>

      {/* Info */}
      <div className="flex items-start gap-2 text-sm text-[#1B3A2F]/80">
        <Info className="w-5 h-5 mt-[2px]" />
        <p>
          Un hébergement est déjà prévu pour vous, sur place, les deux nuits. Vous n’avez pas besoin d’en réserver un.
        </p>
      </div>
    </div>
      </>
      )}
      </section>
    ))}

    <div className="text-center pt-4 mb-10 sm:mb-16 lg:mb-24">
      <button
        onClick={handleSubmit}
        disabled={status === "saving"}
        className="bg-[#1B3A2F] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "saving" ? "Envoi en cours..." : "Valider mes réponses"}
      </button>
    </div>
  </main>
)

}
