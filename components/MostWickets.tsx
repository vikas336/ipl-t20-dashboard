export default function MostWickets({ rows }: { rows: any[] }) {
  if (!rows?.length) return null
  return (
    <section className="my-4 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Top Wicket Takers</h2>
      <ul>
        {rows.map((r, i) => (
          <li key={i} className="border-t py-1">{r.player} - {r.wickets} wickets</li>
        ))}
      </ul>
    </section>
  )
}
