import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Rocket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Logo - Mobile Only */}
      <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
        <div className="bg-gradient-to-br from-[#ffc9e0] via-[#d4b5ff] to-[#a8d5ff] p-2 rounded-lg">
          <Rocket className="w-6 h-6 text-white shadow-sm" />
        </div>
        <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-tight">CareerLift</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600">Enter your credentials to access your dashboard.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700 mb-2 font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
              Password
            </label>
            <a href="#" className="text-sm text-[#d4b5ff] hover:text-[#b89bef] font-medium">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Keep Logged In */}
        <div className="flex items-center">
          <input
            id="keep-logged-in"
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="w-4 h-4 text-[#d4b5ff] border-gray-300 rounded focus:ring-[#d4b5ff]"
          />
          <label htmlFor="keep-logged-in" className="ml-2 text-sm text-gray-700">
            Keep me logged in for 30 days
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 hover:bg-fuchsia-400 hover:bg-none text-white py-3 rounded-lg flex items-center justify-center gap-2 transition font-medium shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Divider */}


      {/* Sign Up Link */}
      <p className="text-center mt-6 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#d4b5ff] hover:text-[#b89bef] font-medium">
          Create free account
        </Link>
      </p>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © 2026 CareerLift Inc. · Privacy · Terms
      </div>
    </div>
  );
}