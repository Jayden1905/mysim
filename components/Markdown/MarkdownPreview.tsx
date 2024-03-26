import Markdown from 'react-markdown'

import { cn } from '@/lib/utils'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

export default function MarkdownPreview({
  content,
  className = 'sm:px-10',
}: {
  content: string
  className?: string
}) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      className={cn('dark:text-primary space-y-8', className)}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-bold" />
        },
        h2: ({ node, ...props }) => {
          return <h1 {...props} className="text-2xl font-bold mt-10 mb-10" />
        },
        h3: ({ node, ...props }) => {
          return <h1 {...props} className="text-xl font-bold mt-10 mb-10" />
        },
        a: ({ node, ...props }) => {
          return (
            <a {...props} target="_blank" className="text-blue-600 underline" />
          )
        },
        table: ({ node, ...props }) => {
          return <table {...props} className="table-auto w-full" />
        },
        th: ({ node, ...props }) => {
          return (
            <th
              {...props}
              className="p-2 border border-black dark:border-primary"
            />
          )
        },
        td: ({ node, ...props }) => {
          return (
            <td
              {...props}
              className="p-2 border border-black dark:border-primary"
            />
          )
        },
        tr: ({ node, ...props }) => {
          return <tr {...props} />
        },
        img: ({ node, ...props }) => {
          return (
            <div className="px-5">
              <div className="h-[60vh] w-full relative">
                <Image
                  priority
                  src={props.src as string}
                  alt="blog-image"
                  fill
                  sizes="100%"
                  className="object-cover object-center rounded-xl border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          )
        },
      }}
    >
      {content}
    </Markdown>
  )
}
