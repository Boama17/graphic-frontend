import type { Metadata } from 'next'
import { Didact_Gothic, Mukta } from 'next/font/google'
import './globals.css'
import logo from "@/../public/assets/img/logo.png"

// Configure the fonts
const didactGothic = Didact_Gothic({
  weight: '400', // Didact Gothic only has one weight
  subsets: ['latin'],
  variable: '--font-didact-gothic',
})

const mukta = Mukta({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-mukta',
})

export const metadata: Metadata = {
  title: 'Lovereign Bible Church',
  description: 'Welcome to Lovereign Bible Church',
  icons: {
    icon: logo.src,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${didactGothic.variable} ${mukta.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}