import dotenv from 'dotenv'
import z from 'zod'

dotenv.config({ path: '.env' })

const envSchema = z.object({
  SERVER_PORT: z.string(),
})

export const env = envSchema.parse(process.env)
