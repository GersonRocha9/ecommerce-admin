import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ModalProvider } from '@/providers/modal-provider'

import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
