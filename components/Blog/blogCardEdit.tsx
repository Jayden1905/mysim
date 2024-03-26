'use client'

import Image from 'next/image'
import { Blog } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { deleteBlog } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BlogCardEdit({ post }: { post: Blog }) {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full relative">
          <Image
            priority
            src={post.featuredImage}
            alt="Picture of the author"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant={'outline'}>
          <Link href={`/dashboard/blog/edit-blog/${post.id}`}>Edit</Link>
        </Button>
        <Button
          variant={'destructive'}
          onClick={() =>
            deleteBlog({ id: post.id }).then(() => router.refresh())
          }
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
