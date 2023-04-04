import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../athenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
