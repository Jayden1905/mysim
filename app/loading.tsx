import React from 'react'
import { ImSpinner6 } from 'react-icons/im'

export default function LoadingHomePage() {
  return (
    <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-secondary">
      <ImSpinner6 className="h-8 w-8 animate-spin text-white" />
    </div>
  )
}
