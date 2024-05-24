import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'

import { userSchema } from './types'

export async function userCreate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: userSchema,
      },
    },
    async (req, reply) => {
      const { name, email, password } = req.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) {
        return reply.status(400).send({ message: 'User already exists.' })
      }

      const hashedPassword = await hash(password, 8)

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      return reply.status(201).send({
        message: 'User successfully created.',
      })
    },
  )
}
