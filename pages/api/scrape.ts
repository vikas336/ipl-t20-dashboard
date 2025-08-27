import type { NextApiRequest, NextApiResponse } from 'next'
import cache from '../../lib/cache'
import {
  fetchFixtures,
  fetchPointsTable,
  fetchLiveOrUpcoming,
  fetchMostRuns,
  fetchMostWickets
} from '../../lib/scraper'
import dummy from '../../data/dummy.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cached = cache.get('ipl_data')
    if (cached) return res.status(200).json(cached)

    const [fixtures, pointsTable, liveOrUpcoming, mostRuns, mostWickets] = await Promise.all([
      fetchFixtures(),
      fetchPointsTable(),
      fetchLiveOrUpcoming(),
      fetchMostRuns(),
      fetchMostWickets()
    ])

    const payload = {
      liveOrUpcoming: liveOrUpcoming ?? dummy.liveOrUpcoming,
      pointsTable: pointsTable ?? dummy.pointsTable,
      schedule: fixtures ?? dummy.schedule,
      mostRuns: mostRuns ?? [],
      mostWickets: mostWickets ?? []
    }

    cache.set('ipl_data', payload, 60)
    res.status(200).json(payload)
  } catch {
    res.status(200).json(dummy)
  }
}
