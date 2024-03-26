'use server'

import { prisma } from './prisma'
import { Blog, Roles } from '@prisma/client'
import { BlogFormTypes } from './types'

export async function getBlogList(): Promise<Blog[]> {
  return await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getBlogById({ id }: { id: string }) {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
  })
}

export async function getBlogBySlug({ slug }: { slug: string }) {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
  })
}

export async function createBlog({
  title,
  slug,
  featuredImage,
  description,
  body,
  published,
  authorId,
}: BlogFormTypes) {
  await prisma.blog.create({
    data: {
      title,
      slug,
      featuredImage,
      description,
      body,
      published,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  })
}

export async function updateBlog({
  id,
  title,
  slug,
  featuredImage,
  description,
  body,
  published,
}: BlogFormTypes) {
  await prisma.blog.update({
    where: {
      id,
    },
    data: {
      title,
      slug,
      featuredImage,
      description,
      body,
      published,
    },
  })
}

export async function deleteBlog({ id }: { id: string }) {
  await prisma.blog.delete({
    where: {
      id,
    },
  })
}

export async function searchBlog({ title }: { title: string }) {
  return await prisma.blog.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  })
}

export async function updateUserRole({
  email,
  role,
}: {
  email: string
  role: Roles
}) {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      role,
    },
  })
}

export async function getUsers() {
  return await prisma.user.findMany()
}
