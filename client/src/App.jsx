import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { JobBoard } from './components/JobBoard';
import { BeatTheAlgorithm } from './components/BeatTheAlgorithm';
import { Layout } from './components/Layout';
import { Profile } from './components/Profile';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <div className="antialiased text-gray-900 h-full">
        <Routes>
          <Route path="/login" element={
            <div className="flex min-h-screen w-full">
              {/* Left Side - Hero */}
              <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 relative flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

                {/* Logo */}
                <div className="flex items-center gap-3 font-bold text-3xl relative z-10">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                  </div>
                  CareerLift
                </div>

                {/* Testimonial */}
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                  </div>
                  <p className="text-xl leading-relaxed font-medium mb-6">
                    "I doubled my interview calls in 2 weeks using CareerLift. The AI resume optimization is a game-changer for anyone in tech."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-white/50 object-cover" />
                    <div>
                      <p className="font-bold text-lg">Sarah Jenkins</p>
                      <p className="text-white/80 text-sm">Frontend Developer @ TechFlow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                  <LoginForm />
                </div>
              </div>
            </div>
          } />

          <Route path="/register" element={
            <div className="flex min-h-screen w-full">
              {/* Left Side - Hero */}
              <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 relative flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

                {/* Logo */}
                <div className="flex items-center gap-3 font-bold text-3xl relative z-10">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                  </div>
                  CareerLift
                </div>

                {/* Testimonial */}
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                  </div>
                  <p className="text-xl leading-relaxed font-medium mb-6">
                    "I doubled my interview calls in 2 weeks using CareerLift. The AI resume optimization is a game-changer for anyone in tech."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="User" className="w-12 h-12 rounded-full border-2 border-white/50 object-cover" />
                    <div>
                      <p className="font-bold text-lg">Sarah Jenkins</p>
                      <p className="text-white/80 text-sm">Frontend Developer @ TechFlow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                  <RegisterForm />
                </div>
              </div>
            </div>
          } />

          {/* Protected Routes Example */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/beat-the-algorithm" element={<BeatTheAlgorithm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

