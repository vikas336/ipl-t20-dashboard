export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-indigo-600 text-white p-4">
        <div className="max-w-4xl mx-auto font-bold">IPL T20 Live Dashboard</div>
      </header>
      {children}
      <footer className="text-center text-sm p-4 text-slate-600">
        Data scraped from iplt20.com
      </footer>
    </div>
  )
}
