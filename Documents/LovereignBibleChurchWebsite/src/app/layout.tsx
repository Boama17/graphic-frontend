import type React from "react"
import {Inter} from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PartnerBadge from "@/components/partner/JWBMPartnerBadge";
import TrilogyBadge from "@/components/partner/TrilogyBadge"
import EventCountdownBadge from "@/components/ui/EventCountdownBadge"
import {eventsData} from "@/data/eventsData"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lovereign Bible Church",
  description: "Making a people ready for God",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-black">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <TrilogyBadge />
        <PartnerBadge />
        <EventCountdownBadge events={eventsData} />
      </body>
    </html>
  )
}
