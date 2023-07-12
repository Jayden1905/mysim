import React from 'react'
import { ImSpinner6 } from 'react-icons/im'

type Props = {
  height?: string
  width?: string
}

export default function Spinner({ height, width }: Props) {
  const h = height || 'h-8'
  const w = width || 'w-8'

  return <ImSpinner6 className={`h-${h} w-${w} animate-spin text-white`} />
}
