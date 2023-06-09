import Spinner from '@/components/Loaders/spinner'
import React from 'react'

export default function LoadingHomePage() {
  return (
    <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-secondary">
      <Spinner />
    </div>
  )
}
