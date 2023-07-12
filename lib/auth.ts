import { Session } from 'next-auth'
import { NextResponse } from 'next/server'

export function isAuthenticated(session: Session | null) {
  if (!session || !session.user) {
    return false
  }
  return true
}

export function isAdmin(session: Session | null) {
  if (!session || !session.user || session.user.role === 'user') {
    return false
  }
  return true
}
