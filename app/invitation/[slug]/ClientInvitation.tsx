"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-browser"
import { toast } from "sonner"

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
    <main className="bg-white text-black p-6 max-w-2xl mx-auto space-y-8 font-serif">
      <h1 className="text-3xl font-bold text-center tracking-tight">
        {guest.names.join(", ")},
      </h1>

      <p className="text-lg leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded shadow">
        Nous avons le bonheur de vous convier à notre mariage qui aura lieu le <strong>6 juin 2026 à 14h</strong> à la mairie de Cusset.<br /><br />
        Nous serions vraiment heureux de vous accueillir dès le vendredi 5 juin, jusqu’au dimanche 7. Un hébergement est prévu sur le lieu des festivités.<br /><br />
        <strong>Rendez-vous au Domaine de la Saigne, 6 Rue de la Saigne, 03300 Creuzier-le-Vieux.</strong>
      </p>

      {guest.names.map((name, i) => (
        <section key={i} className="rounded-xl border border-gray-300 p-5 bg-white shadow space-y-4">
          <h2 className="text-xl font-semibold">{name}</h2>

          <div>
            <label className="block font-medium mb-1">Présence :</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`presence-${i}`}
                  checked={presences[i] === true}
                  onChange={() => {
                    const copy = [...presences]; copy[i] = true; setPresences(copy)
                  }}
                /> Oui
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name={`presence-${i}`}
                  checked={presences[i] === false}
                  onChange={() => {
                    const copy = [...presences]; copy[i] = false; setPresences(copy)
                  }}
                /> Non
              </label>
            </div>
          </div>

          <div>
            <label htmlFor={`regime-${i}`} className="block font-medium mb-1">Régime alimentaire :</label>
            <textarea
              id={`regime-${i}`}
              value={regimes[i] || ""}
              onChange={(e) => {
                const copy = [...regimes]; copy[i] = e.target.value; setRegimes(copy)
              }}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
              rows={2}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Présence par jour :</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={vendredi[i]}
                  onChange={(e) => {
                    const copy = [...vendredi]; copy[i] = e.target.checked; setVendredi(copy)
                  }}
                /> Vendredi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={samedi[i]}
                  onChange={(e) => {
                    const copy = [...samedi]; copy[i] = e.target.checked; setSamedi(copy)
                  }}
                /> Samedi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={dimanche[i]}
                  onChange={(e) => {
                    const copy = [...dimanche]; copy[i] = e.target.checked; setDimanche(copy)
                  }}
                /> Dimanche
              </label>
            </div>
          </div>
        </section>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={status === "saving"}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          {status === "saving" ? "Envoi en cours..." : "Valider mes réponses"}
        </button>
      </div>
    </main>
  )
}
