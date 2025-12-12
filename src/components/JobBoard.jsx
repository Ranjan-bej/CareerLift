import { Search, MapPin, Bookmark, ArrowLeft, Briefcase, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllCities, getStates } from '../data/indianLocations';
import { JobDetails } from './JobDetails';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function JobBoard() {
  const navigate = useNavigate();
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedDatePosted, setSelectedDatePosted] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  // API Data
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const jobTypeCounts = {
    'Full-time': 130,
    'Part-time': 45,
    'Contract': 52,
    'Internship': 18,
  };

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchJobTitle) params.append('title', searchJobTitle);
        if (selectedLocations.length > 0) params.append('location', selectedLocations.join(','));
        if (selectedJobTypes.length > 0) params.append('type', selectedJobTypes.join(','));
        if (selectedExperience) params.append('experience', selectedExperience);
        if (selectedSalary) params.append('salary', selectedSalary);

        const response = await fetch(`http://localhost:5000/api/jobs?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchJobTitle, selectedLocations, selectedJobTypes, selectedExperience, selectedSalary]);

  const toggleJobType = (type) => {
    setSelectedJobTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Find Your Path
              </h1>
              <p className="text-gray-500 mt-1">Discover opportunities that match your passion.</p>
            </div>
          </div>
        </motion.div>

        {/* Search Bars */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title Search */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchJobTitle}
                  onChange={(e) => setSearchJobTitle(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Location Search */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 font-medium"
                />

                <AnimatePresence>
                  {showLocationDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 py-2"
                    >
                      {getAllCities()
                        .filter(city => city.toLowerCase().includes(selectedLocation.toLowerCase()))
                        .slice(0, 50)
                        .map((city) => (
                          <button
                            key={city}
                            onClick={() => {
                              if (!selectedLocations.includes(city)) {
                                setSelectedLocations([...selectedLocations, city]);
                              }
                              setSelectedLocation('');
                              setShowLocationDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors text-gray-600 text-sm font-medium"
                          >
                            {city}
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Location Tags */}
              <AnimatePresence>
                {selectedLocations.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {selectedLocations.map((location) => (
                      <motion.span
                        key={location}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-100 shadow-sm"
                      >
                        {location}
                        <button
                          onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== location))}
                          className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-72 flex-shrink-0 hidden lg:block"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-800 font-bold">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
                <button
                  className="text-xs text-purple-600 hover:text-purple-700 font-bold uppercase tracking-wide px-2 py-1 hover:bg-purple-50 rounded-md transition"
                  onClick={() => {
                    setSelectedJobTypes([]);
                    setSelectedExperience('');
                    setSelectedSalary('');
                    setSelectedDatePosted('');
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-8">
                {/* Job Type */}
                <div>
                  <h4 className="mb-4 text-sm font-bold text-gray-900">Job Type</h4>
                  <div className="space-y-3">
                    {Object.entries(jobTypeCounts).map(([type, count]) => (
                      <label key={type} className="flex items-center justify-between cursor-pointer group select-none">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${selectedJobTypes.includes(type) ? 'bg-purple-600 border-purple-600 shadow-sm' : 'border-gray-300 bg-white group-hover:border-purple-400'
                            }`}>
                            {selectedJobTypes.includes(type) && <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></motion.svg>}
                          </div>
                          <span className={`${selectedJobTypes.includes(type) ? 'text-gray-900 font-medium' : 'text-gray-600'} text-sm group-hover:text-purple-700 transition`}>{type}</span>
                        </div>
                        <input type="checkbox" checked={selectedJobTypes.includes(type)} onChange={() => toggleJobType(type)} className="hidden" />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="mb-4 text-sm font-bold text-gray-900">Experience</h4>
                  <div className="space-y-3">
                    {['Entry Level', 'Mid-Senior Level', 'Director'].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedExperience === level ? 'border-purple-600' : 'border-gray-300 group-hover:border-purple-400'}`}>
                          {selectedExperience === level && <motion.div layoutId="radioExp" className="w-2.5 h-2.5 bg-purple-600 rounded-full" />}
                        </div>
                        <input type="radio" name="experience" checked={selectedExperience === level} onChange={() => setSelectedExperience(level)} className="hidden" />
                        <span className={`text-sm ${selectedExperience === level ? 'text-gray-900 font-medium' : 'text-gray-600'} group-hover:text-purple-700 transition`}>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h4 className="mb-4 text-sm font-bold text-gray-900">Salary</h4>
                  <div className="space-y-3">
                    {['< $50k', '$50k - $100k', '> $100k'].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedSalary === range ? 'border-purple-600' : 'border-gray-300 group-hover:border-purple-400'}`}>
                          {selectedSalary === range && <motion.div layoutId="radioSal" className="w-2.5 h-2.5 bg-purple-600 rounded-full" />}
                        </div>
                        <input type="radio" name="salary" checked={selectedSalary === range} onChange={() => setSelectedSalary(range)} className="hidden" />
                        <span className={`text-sm ${selectedSalary === range ? 'text-gray-900 font-medium' : 'text-gray-600'} group-hover:text-purple-700 transition`}>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Job Listings */}
          <main className="flex-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <p className="text-gray-500 font-medium text-sm">Found <span className="text-gray-900 font-bold">{jobs.length}</span> opportunities</p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium hidden sm:inline">Sort by:</span>
                <div className="relative">
                  <select className="bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-700 outline-none hover:border-purple-300 focus:ring-2 focus:ring-purple-100 transition shadow-sm appearance-none cursor-pointer">
                    <option>Relevance</option>
                    <option>Date Posted</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  // Skeleton Loader
                  [...Array(3)].map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                    >
                      <div className="flex gap-4 animate-pulse">
                        <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                        <div className="flex-1 max-w-[70%]">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                          <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
                          <div className="flex gap-2">
                            <div className="h-6 w-20 bg-gray-100 rounded-lg" />
                            <div className="h-6 w-20 bg-gray-100 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : jobs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No jobs found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria.</p>
                  </motion.div>
                ) : (
                  jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                      className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-[0_2px_8px_rgb(0,0,0,0.04)] transition-all duration-300 relative group overflow-hidden cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-start justify-between relative z-10">
                        <div className="flex gap-5 flex-1">
                          <div className={`w-16 h-16 ${job.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                            <span className="text-white text-2xl font-bold">{job.companyInitial}</span>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1.5 align-baseline">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">{job.title}</h3>
                              {job.isRemote && (
                                <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">Remote</span>
                              )}
                            </div>

                            <p className="text-gray-500 text-sm mb-4 font-medium flex items-center gap-2">
                              {job.company}
                              <span className="w-1 h-1 bg-gray-300 rounded-full" />
                              {job.location}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/50 rounded-lg text-xs font-semibold transition-colors">
                                {job.type}
                              </span>
                              <span className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100/50 rounded-lg text-xs font-semibold transition-colors">
                                {job.salary}
                              </span>
                              <span className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100/50 rounded-lg text-xs font-semibold transition-colors">
                                {job.experience}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between self-stretch ml-4">
                          <button
                            className="text-gray-300 hover:text-purple-500 transition-colors"
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>

                          <div className="mt-auto flex flex-col items-end gap-2">
                            <span className="text-xs font-semibold text-gray-400">{job.postedDays}d ago</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors font-bold text-sm shadow-lg shadow-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedJob(job);
                              }}
                            >
                              Details
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}

