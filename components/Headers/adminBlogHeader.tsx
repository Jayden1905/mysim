'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { Button } from '../ui/button'
import { useAtom } from 'jotai'
import { searchInputAtom, searchLoadingAtom } from '@/lib/store'

export function AdminBlogheader() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchBtnOpen, setSearchBtnOpen] = useState(false)
  const searchBtnRef = useRef<HTMLDivElement>(null)
  const [, setSearchInput] = useAtom(searchInputAtom)
  const [, setSearchLoading] = useAtom(searchLoadingAtom)

  useEffect(() => {
    if (searchBtnOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 300)
    } else {
      searchInputRef.current?.blur()
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        searchBtnRef.current &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchBtnOpen(false)
        setSearchLoading(false)
        if (searchInputRef.current) searchInputRef.current.value = ''
        setSearchInput('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchInputRef, searchBtnOpen, setSearchLoading, setSearchInput])

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Link scroll={false} href={'/dashboard/blog/create-blog'}>
          <Button>
            New Post
            <AiOutlinePlus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div
        onClick={() => setSearchBtnOpen(true)}
        className="flex relative items-center justify-center"
      >
        <div
          ref={searchBtnRef}
          className={`absolute ${searchBtnOpen ? 'right-[85%]' : ''}`}
        >
          <BsSearch className={`z-10 h-5 w-5 cursor-pointer`} />
        </div>
        <input
          disabled={!searchBtnOpen}
          className={`${
            searchBtnOpen ? 'w-52 px-10' : 'w-10 px-0'
          } h-10 rounded-full bg-gray-200 dark:bg-black outline-none transition-all duration-300 ease-in-out`}
          ref={searchInputRef}
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
