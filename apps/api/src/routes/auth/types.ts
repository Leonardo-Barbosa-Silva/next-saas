import z from 'zod'

export const userSchema = z.object({
  name: z.string().max(25),
  email: z.string().email(),
  password: z.string().min(6),
})
