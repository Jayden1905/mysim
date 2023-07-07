import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata = {
  title: 'MYSIM',
  description:
    'MYSIM is a myanmar community for burmese students at Singapore Institute of Manage (SIM).',
  keywords: ['mysim', 'myanamr', 'sim', 'singapore', 'community'],
  author: 'Kyaw Za Yan Naing',
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <div>Hello {session?.user?.name}</div>
      <div>He is a {session?.user.role}</div>
    </main>
  )
}
