export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Habit Tracker</h1>
              <p className="text-sm text-slate-400">Build your best self</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
