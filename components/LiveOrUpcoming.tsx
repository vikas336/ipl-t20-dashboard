type Props = { item: any }
export default function LiveOrUpcoming({ item }: Props) {
  if (!item) return null
  const { status, teams, venue, time, summary } = item
  return (
    <section className="my-4 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">{status === 'live' ? 'Live Match' : 'Upcoming Match'}</h2>
      <div className="mt-2">
        <div className="text-xl font-bold">{teams?.home} vs {teams?.away}</div>
        <div className="text-sm text-slate-600">{venue} • {time}</div>
        {summary && <div className="mt-2 text-sm">{summary}</div>}
      </div>
    </section>
  )
}
