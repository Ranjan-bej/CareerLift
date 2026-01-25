import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Sparkles, TrendingUp, Search, ArrowRight, Zap, Target, Briefcase } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 py-12"
      >
        {/* Hero Section */}
        <motion.div variants={item} className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  {user?.name || 'Explorer'}
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl">
                Your career command center. Track your progress, optimize your resume, and find your next dream role.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Job Board Card */}
          <motion.div
            variants={item}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative overflow-hidden bg-white rounded-[2rem] p-10 shadow-lg border border-gray-100 cursor-pointer"
            onClick={() => navigate('/jobs')}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Find Your Next Role
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Browse thousands of curated tech jobs. Filter by verified salary, remote options, and tech stack match.
                </p>
              </div>

              <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                Explore Job Board <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.div>

          {/* Beat The Algorithm Card */}
          <motion.div
            variants={item}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative overflow-hidden bg-white rounded-[2rem] p-10 shadow-lg border border-gray-100 cursor-pointer"
            onClick={() => navigate('/beat-the-algorithm')}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-200 mb-6">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Beat The Algorithm
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  75% of resumes are rejected by bots. Get instant AI feedback and optimize your keywords to get hired.
                </p>
              </div>

              <div className="flex items-center text-purple-600 font-bold group-hover:translate-x-2 transition-transform">
                Optimize Resume <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Features */}
        <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Market Insights</h3>
            <p className="text-sm text-gray-500">Real-time salary data and hiring trends for your role.</p>
          </div>

          <div
            onClick={() => navigate('/resume-templates')}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Resume Templates</h3>
            <p className="text-sm text-gray-500">ATS-friendly templates designed by hiring managers.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Interview Prep</h3>
            <p className="text-sm text-gray-500">Practice questions and mock interviews with AI.</p>
          </div>
        </motion.div>

      </motion.main>
    </div >
  );
}
