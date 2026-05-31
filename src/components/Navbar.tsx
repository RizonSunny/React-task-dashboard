export default function Navbar() {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="text-sm text-slate-600">Welcome back</div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-slate-700">Rizon</div>
        <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium">
          R
        </div>
      </div>
    </header>
  );
}