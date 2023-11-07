import '../styles/globals.scss'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Layout from '@/components/screens/Layout/Layout'
import Providers from '@/providers/Providers'
import axios from 'axios'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Чатик для общительных',
  description: 'Real-time chat',
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
