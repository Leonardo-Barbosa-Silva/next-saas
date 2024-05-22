import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { userSchema } from './types'

export async function userRegister(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: userSchema,
      },
    },
    (req, reply) => {
      reply.send('User successfully created.')
    },
  )
}
