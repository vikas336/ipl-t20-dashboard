export default function PointsTable({ rows }: { rows: any[] }) {
  return (
    <section className="my-4 p-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Points Table</h2>
      <table className="w-full text-sm">
        <thead className="text-slate-600">
          <tr>
            <th className="text-left">Team</th>
            <th>Played</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
            <th>NRR</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((r, i) => (
            <tr key={i} className="border-t">
              <td>{r.team}</td>
              <td className="text-center">{r.played}</td>
              <td className="text-center">{r.wins}</td>
              <td className="text-center">{r.losses}</td>
              <td className="text-center">{r.points}</td>
              <td className="text-center">{r.nrr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
