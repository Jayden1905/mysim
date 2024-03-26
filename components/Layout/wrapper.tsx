import React, { ReactNode } from 'react'

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="px-2 sm:px-12">{children}</div>
}
