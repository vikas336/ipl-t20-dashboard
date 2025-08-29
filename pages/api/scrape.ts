import type { NextApiRequest, NextApiResponse } from 'next'
import dummy from '../../data/dummy.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(dummy)
  } catch (err) {
    console.error("API scrape error", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
