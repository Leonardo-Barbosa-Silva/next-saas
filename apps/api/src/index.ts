import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { userRegister } from './routes/auth'

const port = Number(env.SERVER_PORT) || 3333
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)
app.register(userRegister)

app.listen({ port }).then(() => {
  console.log(`Server running on port: ${port}`)
})
