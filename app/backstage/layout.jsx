'use client'

import { SessionProvider } from 'next-auth/react'

export default function BackstageLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
