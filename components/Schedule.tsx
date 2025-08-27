export default function Schedule({ fixtures }: { fixtures: any[] }) {
  return (
    <section className="my-4 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Schedule</h2>
      <div className="grid gap-2">
        {fixtures?.map((f, idx) => (
          <div key={idx} className="p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{f.home} vs {f.away}</div>
              <div className="text-sm text-slate-600">{f.date} • {f.time} • {f.venue}</div>
            </div>
            <div className="text-sm text-slate-500">{f.matchNo ? `#${f.matchNo}` : ''}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
