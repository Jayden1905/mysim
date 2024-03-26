'use client'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { createBlog, updateBlog } from '@/lib/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOff, PencilIcon, RocketIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '../ui/use-toast'
import { BlogFormTypes } from '@/lib/types'
import { ImSpinner8 } from 'react-icons/im'
import { blogFormSchema } from '../FormSchemas/blogFormSchema'
import MarkdownPreview from '../Markdown/MarkdownPreview'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { blogFormPreview } from '@/lib/store'
import { Blog } from '@prisma/client'

export default function BlogForm({
  userid,
  formEditData,
  isEditState,
}: {
  userid: string
  formEditData?: Blog
  isEditState: boolean
}) {
  const [isPreview, setPreivew] = useAtom(blogFormPreview)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof blogFormSchema>>(
    !isEditState
      ? {
          resolver: zodResolver(blogFormSchema),
          defaultValues: {
            title: '',
            featuredImage: '',
            body: '',
            description: '',
            published: true,
          },
        }
      : {
          resolver: zodResolver(blogFormSchema),
          defaultValues: {
            title: formEditData && formEditData.title,
            featuredImage: formEditData && formEditData.featuredImage,
            body: formEditData && formEditData.body,
            description: formEditData && formEditData.description,
            published: formEditData && formEditData.published,
          },
        }
  )

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/ /g, '-')
  }

  async function onHandleSubmit(data: BlogFormTypes) {
    try {
      await createBlog(data).then(() => {
        toast({
          title: 'Successfully created a post 🎉',
        })
        router.push('/dashboard/blog')
        router.refresh()
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Fail to create the post 😢',
          description: error.message,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Fail to create the post 😢',
        })
      }
    }
  }

  async function onHandleEditSubmit(data: BlogFormTypes) {
    try {
      await updateBlog(data).then(() => {
        toast({
          title: 'Successfully updated the post 🎉',
        })
        router.push('/dashboard/blog')
        router.refresh()
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Fail to update the post 😢',
          description: error.message,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Fail to update the post 😢',
        })
      }
    }
  }

  function onSubmit(values: z.infer<typeof blogFormSchema>) {
    startTransition(() => {
      isEditState &&
        onHandleEditSubmit({
          title: values.title,
          slug: generateSlug(values.title),
          body: values.body,
          description: values.description,
          featuredImage: values.featuredImage,
          published: values.published,
          authorId: userid,
          id: formEditData?.id,
        })

      !isEditState &&
        onHandleSubmit({
          title: values.title,
          slug: generateSlug(values.title),
          body: values.body,
          description: values.description,
          featuredImage: values.featuredImage,
          published: values.published,
          authorId: userid,
        })
    })

    form.reset()
  }

  return (
    <div className="bg-white dark:bg-dark rounded-lg p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 flex-wrap">
            <span
              onClick={() => {
                setPreivew(
                  !isPreview && !form.getFieldState('featuredImage').invalid
                )
              }}
              role="button"
              tabIndex={0}
              className="flex gap-2 items-center px-3 py-2 bg-secondary text-white dark:bg-white dark:text-secondary rounded-md transition-all text-sm"
            >
              {!isPreview ? (
                <>
                  <EyeIcon />
                  Preivew
                </>
              ) : (
                <>
                  <EyeOff />
                  Stop Preview
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2 border p-2 rounded-md dark:bg-zinc-900">
                      <RocketIcon className="w-4 h-4" />
                      <span className="">Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isPreview && (
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl sm:px-10 font-bold">
                {form.getValues().title}
              </h1>
              <div className="h-[30rem] w-full relative mb-3">
                <Image
                  priority
                  src={form.getValues().featuredImage}
                  alt="blog-image"
                  fill
                  sizes="100%"
                  className="object-cover object-center rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>
              <MarkdownPreview content={form.getValues().body} />
            </div>
          )}
          {!isPreview && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Blog Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="summary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Featured Image</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Blog Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="content"
                        className="h-[70vh] w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending ? true : false}>
                {isPending && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPending ? 'Please wait' : isEditState ? 'Update' : 'Create'}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
