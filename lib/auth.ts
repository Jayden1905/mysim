import { Roles } from '@prisma/client'
import { Session } from 'next-auth'

export function isAuthenticated(session: Session | null) {
  if (!session) return false
  if (!session.user) return false

  return true
}

export function isAdmin(session: Session | null) {
  if (!isAuthenticated(session)) return false
  if (!teamRoles.includes(session?.user.role as Roles)) return false

  return true
}

export const teamRoles: Roles[] = ['admin', 'developer', 'content_creator']
