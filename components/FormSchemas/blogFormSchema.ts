import * as z from 'zod'

export const blogFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Blog title must be at least 2 characters.',
  }),
  featuredImage: z.string().url({ message: 'Invalid image url.' }),
  body: z.string().min(2, {
    message: 'Blog content must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Blog description must be at least 2 characters.',
  }),
  published: z.boolean(),
})
