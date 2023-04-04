import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript gym',
      description: 'Test description',
      phone: '1234567890',
      latitude: -23.2049009,
      longitude: -45.8944638,
    })

    await gymsRepository.create({
      title: 'typescript gym',
      description: 'Test description',
      phone: '1234567890',
      latitude: -23.2049009,
      longitude: -45.8944638,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript gym ${i}`,
        description: 'Test description',
        phone: '1234567890',
        latitude: -23.2049009,
        longitude: -45.8944638,
      })
    }
    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gym 21' }),
      expect.objectContaining({ title: 'Javascript gym 22' }),
    ])
  })
})
