'use client'
import { searchBlog } from '@/lib/actions'
import { searchInputAtom, searchLoadingAtom } from '@/lib/store'
import { Blog } from '@prisma/client'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import BlogCardEdit from '../Blog/blogCardEdit'
import { AdminBlogheader } from '../Headers/adminBlogHeader'
import Spinner from '../Loaders/spinner'

type AdminBlogProps = {
  posts: Blog[]
}

export function AdminBlogPage(props: AdminBlogProps) {
  const [searchInput, _setSerachInput] = useAtom(searchInputAtom)
  const [searchPosts, setSearchPosts] = useState<Blog[]>([])
  const [searchLoading, setSearchLoading] = useAtom(searchLoadingAtom)

  useEffect(() => {
    // debounce search
    setSearchLoading(true)
    const timer = setTimeout(() => {
      void searchBlog({ title: searchInput }).then((res) => {
        setSearchPosts(res)
        setSearchLoading(false)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, setSearchLoading])

  return (
    <>
      <div className="h-full w-full rounded-lg bg-white dark:bg-dark p-4">
        <AdminBlogheader />
        <section className="mt-10">
          {searchLoading && (
            <div className="w-full flex justify-center">
              <Spinner height="8" width="8" />
            </div>
          )}
          {!searchLoading && (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              }}
            >
              {searchInput !== '' &&
                searchPosts.map((post, index) => (
                  <BlogCardEdit post={post} key={index} />
                ))}

              {searchInput === '' &&
                props.posts.map((post, index) => (
                  <BlogCardEdit post={post} key={index} />
                ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
