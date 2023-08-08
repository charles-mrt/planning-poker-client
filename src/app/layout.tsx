import './globals.css'
import { Titillium_Web } from 'next/font/google'
import { Head } from './head'

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-titillium'
})

export const metadata = {
  title: {
    default: 'Planning Poker',
    template: '%s | Planning Poker'
  },
  robots: {
    index: true,
    follow: true,
  },
  description: 'Sistema para realizar estimativa de esforço de tempo, utilizando a técnica de gameficação do planning poker.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">      
      <Head />
      <body className={`${titillium.variable} font-sans w-screen h-screen bg-white`}>
        {children}
      </body>
    </html>
  );
}