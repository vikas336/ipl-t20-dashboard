import type { NextApiRequest, NextApiResponse } from 'next'
import cache from '../../lib/cache'
import { fetchFixtures, fetchPointsTable, fetchLiveOrUpcoming } from '../../lib/scraper'
import dummy from '../../data/dummy.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cached = cache.get('ipl_data')
    if (cached) return res.status(200).json(cached)

    const [fixtures, pointsTable, liveOrUpcoming] = await Promise.all([
      fetchFixtures(),
      fetchPointsTable(),
      fetchLiveOrUpcoming()
    ])

    const payload = {
      liveOrUpcoming: liveOrUpcoming ?? dummy.liveOrUpcoming,
      pointsTable: pointsTable ?? dummy.pointsTable,
      schedule: fixtures ?? dummy.schedule
    }

    cache.set('ipl_data', payload, 60)
    res.status(200).json(payload)
  } catch (err) {
    console.error("API scrape error", err)
    res.status(200).json(dummy)
  }
}
