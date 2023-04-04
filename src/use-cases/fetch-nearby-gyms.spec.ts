import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: 'Test description',
      phone: '1234567890',
      latitude: -23.2049009,
      longitude: -45.8944638,
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: 'Test description',
      phone: '1234567890',
      latitude: -23.5470877,
      longitude: -46.6524742,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.2049009,
      userLongitude: -45.8944638,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
