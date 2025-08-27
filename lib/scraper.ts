import axios from 'axios'
import cheerio from 'cheerio'

const BASE = 'https://www.iplt20.com'

export async function fetchFixtures() {
  try {
    const { data } = await axios.get(BASE + '/matches/fixtures')
    const $ = cheerio.load(data)
    const fixtures: any[] = []
    $('a.fixtures-list__match').each((i, el) => {
      fixtures.push({
        home: $(el).find('.team--home .team__name').text().trim(),
        away: $(el).find('.team--away .team__name').text().trim(),
        date: $(el).find('.fixture__date').text().trim(),
        time: $(el).find('.fixture__time').text().trim(),
        venue: $(el).find('.fixture__venue').text().trim(),
        matchNo: $(el).find('.fixture__match-number').text().trim()
      })
    })
    return fixtures.length ? fixtures : null
  } catch { return null }
}

export async function fetchPointsTable() {
  try {
    const { data } = await axios.get(BASE + '/matches/points-table')
    const $ = cheerio.load(data)
    const rows: any[] = []
    $('table.points-table tbody tr').each((i, tr) => {
      rows.push({
        team: $(tr).find('.team__name').text().trim() || $(tr).find('td').eq(0).text().trim(),
        played: $(tr).find('td').eq(1).text().trim(),
        wins: $(tr).find('td').eq(2).text().trim(),
        losses: $(tr).find('td').eq(3).text().trim(),
        points: $(tr).find('td').eq(4).text().trim(),
        nrr: $(tr).find('td').eq(5).text().trim()
      })
    })
    return rows.length ? rows : null
  } catch { return null }
}

export async function fetchLiveOrUpcoming() {
  try {
    const { data } = await axios.get(BASE)
    const $ = cheerio.load(data)
    const liveCard = $('.match-status--live, .match-card--live').first()
    if (liveCard.length) {
      return {
        status: 'live',
        teams: {
          home: liveCard.find('.team--home .team__name').text().trim(),
          away: liveCard.find('.team--away .team__name').text().trim()
        },
        summary: liveCard.find('.match-status__summary').text().trim(),
        venue: liveCard.find('.fixture__venue').text().trim(),
        time: ''
      }
    }
    const fixtures = await fetchFixtures()
    if (fixtures && fixtures.length) return { status: 'upcoming', ...fixtures[0] }
    return null
  } catch { return null }
}

export async function fetchMostRuns() {
  try {
    const { data } = await axios.get(BASE + '/stats/2025/most-runs')
    const $ = cheerio.load(data)
    const rows: any[] = []
    $('table tbody tr').slice(0,5).each((i, tr) => {
      rows.push({
        player: $(tr).find('td').eq(0).text().trim(),
        runs: $(tr).find('td').eq(2).text().trim()
      })
    })
    return rows.length ? rows : null
  } catch { return null }
}

export async function fetchMostWickets() {
  try {
    const { data } = await axios.get(BASE + '/stats/2025/most-wickets')
    const $ = cheerio.load(data)
    const rows: any[] = []
    $('table tbody tr').slice(0,5).each((i, tr) => {
      rows.push({
        player: $(tr).find('td').eq(0).text().trim(),
        wickets: $(tr).find('td').eq(2).text().trim()
      })
    })
    return rows.length ? rows : null
  } catch { return null }
}
