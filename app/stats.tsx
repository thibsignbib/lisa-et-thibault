"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-browser"

interface Guest {
  names: string[]
  presences: boolean[]
  regime_alimentaire: string[]
}

export default function StatsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuests() {
      const { data, error } = await supabase.from("guests").select("names, presences, regime_alimentaire")
      if (!error && data) {
        setGuests(data)
      }
      setLoading(false)
    }

    fetchGuests()
  }, [])

  const confirmedNames: string[] = []
  let totalConfirmed = 0
  let totalVegetarian = 0
  let totalNonVegetarian = 0

  guests.forEach((guest) => {
    guest.names.forEach((name, index) => {
      if (guest.presences[index]) {
        confirmedNames.push(name)
        totalConfirmed++
        const regime = guest.regime_alimentaire[index]
        if (regime === "vege") totalVegetarian++
        if (regime === "non-vege") totalNonVegetarian++
      }
    })
  })

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6 text-[#1B3A2F] space-y-6">
      <h1 className="text-3xl font-bold text-center">Statistiques</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          <p><strong>Nombre total d'invités :</strong> {guests.reduce((sum, g) => sum + g.names.length, 0)}</p>
          <p><strong>Nombre de repas végétariens confirmés :</strong> {totalVegetarian}</p>
          <p><strong>Nombre de repas non-végé confirmés :</strong> {totalNonVegetarian}</p>
          <p><strong>Nombre total de personnes confirmées :</strong> {totalConfirmed}</p>
          <div>
            <strong>Liste des personnes confirmées :</strong>
            <ul className="list-disc list-inside">
              {confirmedNames.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
