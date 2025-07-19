// app/page.tsx
"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase-browser"
export const dynamic = "force-dynamic"

export default function Home() {
  useEffect(() => {
      async function fetchGuests() {
            const { data, error } = await supabase.from("guests").select("*")
                  console.log(data, error)
                      }

                          fetchGuests()
                            }, [])

                              return <h1>Bienvenue sur le faire-part !</h1>
                              }
