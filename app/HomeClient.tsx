"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase-browser"

export default function HomeClient() {
  useEffect(() => {
    async function fetchGuests() {
      const { data, error } = await supabase.from("guests").select("*")
      console.log(data, error)
    }

    fetchGuests()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-[#1B3A2F] p-6 space-y-6">
      <img
        src="/lisathibaultT.png"
        alt="Lisa & Thibault"
        className="w-full max-w-md sm:max-w-lg md:max-w-xl h-auto mb-4 homepagepicture"
      />
      <h1 className="text-wedding text-4xl sm:text-6xl text-center">Lisa & Thibault</h1>
       <p className="text-kgWildways text-lg leading-relaxed backdrop-blur-sm p-4 rounded">
        Clique sur le lien envoyé par nos soins pour retrouver le faire part personnalisé !
      </p>
    </main>
  )
}
