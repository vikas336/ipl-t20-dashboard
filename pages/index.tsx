import useSWR from 'swr'
import Layout from '../components/Layout'
import LiveOrUpcoming from '../components/LiveOrUpcoming'
import PointsTable from '../components/PointsTable'
import Schedule from '../components/Schedule'
import MostRuns from '../components/MostRuns'
import MostWickets from '../components/MostWickets'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/scrape', fetcher, { refreshInterval: 30000 })

  if (error) return <Layout><div>Error loading data</div></Layout>
  if (!data) return <Layout><div>Loading...</div></Layout>

  const { liveOrUpcoming, pointsTable, schedule, mostRuns, mostWickets } = data

  return (
    <Layout>
      <main className="p-4 max-w-4xl mx-auto">
        <LiveOrUpcoming item={liveOrUpcoming} />
        <PointsTable rows={pointsTable} />
        <Schedule fixtures={schedule} />
        <MostRuns rows={mostRuns} />
        <MostWickets rows={mostWickets} />
      </main>
    </Layout>
  )
}
