"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-browser"

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

  // Local form state (editable)
  const [presences, setPresences] = useState<boolean[]>([])
  const [regimes, setRegimes] = useState<string[]>([])
  const [vendredi, setVendredi] = useState<boolean[]>([])
  const [samedi, setSamedi] = useState<boolean[]>([])
  const [dimanche, setDimanche] = useState<boolean[]>([])

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

  if (loading) return <p>Chargement...</p>
  if (!guest) return null

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{guest.names.join(", ")},</h1>

      <p className="faire-part">
        Nous avons le bonheur de vous convier à notre mariage qui aura lieu le 6/6/2026 à 14 heures à la mairie de Cusset.
        Et comme le temps passe trop vite quand on est entouré de ceux qu’on aime, nous serions vraiment heureux de vous accueillir dès le vendredi 5 juin, jusqu’au dimanche 7.
        Un hébergement est donc prévu pour vous sur le lieu des festivités. <br />
        <strong>Rendez-vous au Domaine de la Saigne, 6 Rue de la Saigne, 03300 Creuzier-le-Vieux.</strong>
      </p>

      {guest.names.map((name, i) => (
        <section key={i} className="border rounded-lg p-4 space-y-4 bg-gray-50">
          <h2 className="text-lg font-semibold">{name}</h2>

          {/* Présence */}
          <div>
            <label className="block font-medium">Présence :</label>
            <label>
              <input
                type="radio"
                name={`presence-${i}`}
                checked={presences[i] === true}
                onChange={() => {
                  const copy = [...presences]
                  copy[i] = true
                  setPresences(copy)
                }}
              />{" "}
              Oui
            </label>{" "}
            <label className="ml-4">
              <input
                type="radio"
                name={`presence-${i}`}
                checked={presences[i] === false}
                onChange={() => {
                  const copy = [...presences]
                  copy[i] = false
                  setPresences(copy)
                }}
              />{" "}
              Non
            </label>
          </div>

          {/* Régime alimentaire */}
          <div>
            <label className="block font-medium" htmlFor={`regime-${i}`}>
              Régime alimentaire :
            </label>
            <textarea
              id={`regime-${i}`}
              value={regimes[i] || ""}
              onChange={(e) => {
                const copy = [...regimes]
                copy[i] = e.target.value
                setRegimes(copy)
              }}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Jours */}
          <div>
            <label className="block font-medium">Présence par jour :</label>
            <label className="block">
              <input
                type="checkbox"
                checked={vendredi[i]}
                onChange={(e) => {
                  const copy = [...vendredi]
                  copy[i] = e.target.checked
                  setVendredi(copy)
                }}
              />{" "}
              Vendredi
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={samedi[i]}
                onChange={(e) => {
                  const copy = [...samedi]
                  copy[i] = e.target.checked
                  setSamedi(copy)
                }}
              />{" "}
              Samedi
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={dimanche[i]}
                onChange={(e) => {
                  const copy = [...dimanche]
                  copy[i] = e.target.checked
                  setDimanche(copy)
                }}
              />{" "}
              Dimanche
            </label>
          </div>
        </section>
      ))}

      <p className="text-sm text-gray-600">
        Type : <strong>{guest.type}</strong> <br />
        Nombre total attendu : <strong>{guest.presence_number}</strong> / {guest.number_of_persons}
      </p>
    </main>
  )
}
