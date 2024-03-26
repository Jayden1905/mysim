import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import BlogForm from '@/components/Blog/blogForm'
import { getServerSession } from 'next-auth'

export default async function CreateBlog() {
  const session = await getServerSession(authOptions)
  const userid = session?.user?.id || ''

  return (
    <>
      <BlogForm userid={userid} isEditState={false} />
    </>
  )
}
