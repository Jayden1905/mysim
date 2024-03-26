import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { AdminBlogPage } from '@/components/Pages/adminBlogPage'
import { getBlogList } from '@/lib/actions'
import { isAdmin } from '@/lib/auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Blog',
  description: 'Admin Blog Page',
}

export default async function Page() {
  const session = await getServerSession(authOptions)
  const blogPosts = await getBlogList()

  if (!isAdmin(session)) {
    redirect('/')
  }

  return (
    <div>
      <AdminBlogPage posts={blogPosts} />
    </div>
  )
}
