import BlogForm from '@/components/Blog/blogForm'
import { getBlogById } from '@/lib/actions'
import { Blog } from '@prisma/client'

export default async function EditBlogPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getBlogById({ id: params.id })

  return (
    <div className="h-full w-full rounded-lg bg-white dark:bg-dark p-4">
      <BlogForm
        userid={post?.authorId || ''}
        formEditData={post as Blog}
        isEditState={true}
      />
    </div>
  )
}
