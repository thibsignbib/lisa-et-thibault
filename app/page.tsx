"use client"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase-browser"

export default function Home() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from("guests").select("*")
      console.log("Data:", data)
      console.log("Error:", error)
    }

    testConnection()
  }, [])

  return <h1>Bienvenue sur le faire-part 🎉</h1>
}
