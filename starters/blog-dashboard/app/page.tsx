'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StarterHome() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to dashboard...</p>
    </div>
  )
}
