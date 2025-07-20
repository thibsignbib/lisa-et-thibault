"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-browser"

export default function InvitationPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [guest, setGuest] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuest() {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", params.slug)
        .single()

      if (!data || error) {
        router.push("/404")
      } else {
        setGuest(data)
        setLoading(false)
      }
    }

    fetchGuest()
  }, [params.slug, router])

  if (loading) return <p>Chargement...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Bienvenue {guest.nom} 🎉</h1>

      {guest.names && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Personnes invitées :</h2>
          <ul className="list-disc list-inside">
            {guest.names.map((name: string, i: number) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {guest.regime_alimentaire?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Préférences alimentaires :</h2>
          <ul className="list-disc list-inside">
            {guest.regime_alimentaire.map((regime: string, i: number) => (
              <li key={i}>{regime}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
