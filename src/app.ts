import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { checkInsRoutes } from './http/controllers/check-ins/route'
import { gymsRoutes } from './http/controllers/gyms/route'
import { usersRoutes } from './http/controllers/users/route'

export const app = fastify()

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to external tool like DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
