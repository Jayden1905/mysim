import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { DefaultSession, DefaultUser, NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import { getToken } from 'next-auth/jwt'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string | null
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser extends DefaultUser {
    role: string | null
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user && user.id) {
        const prismaUser = await prisma.user.findUnique({
          where: { id: user.id },
        })

        if (prismaUser) {
          session.user = {
            ...user,
            role: prismaUser.role || null,
          }
        }
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
