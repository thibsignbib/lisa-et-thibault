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
}

interface PageProps {
  params: {
    slug: string
  }
  searchParams?: Record<string, string | string[]>
}

export default function InvitationPage({ params }: PageProps) {
  const router = useRouter()
  const [guest, setGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuest() {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", params.slug)
        .single<Guest>()

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
  if (!guest) return null

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenue {guest.names.join(", ")} 🎉
      </h1>

      <section>
        <h2 className="text-lg font-semibold">Personnes invitées :</h2>
        <ul className="list-disc list-inside">
          {guest.names.map((name, i) => (
            <li key={i}>
              {name}
              {typeof guest.presences?.[i] === "boolean" && (
                <span className="ml-2">
                  {guest.presences[i] ? "✅ présent·e" : "❌ absent·e"}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {guest.regime_alimentaire?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Préférences alimentaires :</h2>
          <ul className="list-disc list-inside">
            {guest.regime_alimentaire.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <p className="text-sm text-gray-600">
          Type d’invité·e·s : <strong>{guest.type}</strong><br />
          Nombre total attendu : <strong>{guest.presence_number}</strong> / {guest.number_of_persons}
        </p>
      </section>
    </main>
  )
}
