import { Rocket, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header({ onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-[#ffc9e0] via-[#d4b5ff] to-[#a8d5ff] p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 text-white shadow-sm" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-tight">CareerLift</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors hover:bg-purple-50 rounded-full">
            <User className="w-4 h-4" />
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black rounded-full transition-all hover:shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
