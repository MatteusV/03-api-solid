import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInsUseCaseHistory } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()

  const useCase = new FetchUserCheckInsUseCaseHistory(checkInsRepository)
  return useCase
}
