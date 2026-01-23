import { ArrowLeft, MapPin, Briefcase, Calendar,  Share2, DollarSign, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function JobDetails({ job, onBack }) {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
    const isApplied = appliedJobs.some(j => j.id === job.id);
    setHasApplied(isApplied);
  }, [job.id]);

  const handleApply = () => {
    const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
    if (!appliedJobs.some(j => j.id === job.id)) {
      appliedJobs.push({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        appliedDate: new Date().toISOString()
      });
      localStorage.setItem('applied_jobs', JSON.stringify(appliedJobs));
      setHasApplied(true);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-2 px-3 hover:bg-gray-100 rounded-lg group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Jobs</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* <button className="p-2 hover:bg-purple-50 text-gray-400 hover:text-purple-600 rounded-xl transition border border-transparent hover:border-purple-100">
                <Heart className="w-5 h-5" />
              </button> */}
              <button className="p-2 hover:bg-purple-50 text-gray-400 hover:text-purple-600 rounded-xl transition border border-transparent hover:border-purple-100">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Job Details */}
          <div className="flex-1 min-w-0">
            {/* Job Header */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-20 h-20 ${job.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white text-3xl font-bold">{job.companyInitial}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="w-4 h-4 text-purple-500" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{job.location}</span>
                      {job.isRemote && <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs border border-green-100">Remote</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>Posted {job.postedDays} days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About the Role */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4 inline-block">About the Role</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">{job.aboutRole || job.description}</p>
              {job.companyDescription && (<p className="text-gray-600 leading-relaxed">{job.companyDescription}</p>)}
            </motion.div>

            {/* Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                        <span className="text-purple-600 text-sm font-bold">✓</span>
                      </div>
                      <span className="text-gray-600 flex-1 leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2.5 flex-shrink-0" />
                      <span className="text-gray-600 flex-1 leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-2xl">✨</span>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Application Card */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                {/* Compensation */}
                <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="text-sm font-bold text-purple-900 uppercase tracking-wide mb-1">Total Compensation</div>
                  <div className="text-3xl font-extrabold text-gray-900">{job.salary}</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Estimated / year</div>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Job Type</div>
                    <div className="font-semibold text-gray-900 bg-gray-50 inline-block px-3 py-1 rounded-lg border border-gray-200">{job.type}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Experience</div>
                    <div className="font-semibold text-gray-900">{job.experience}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Level</div>
                    <div className="font-semibold text-gray-900">{job.level || 'Senior'}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Location</div>
                    <div className="font-semibold text-gray-900">{job.isRemote ? 'Remote' : 'On-site'}</div>
                  </div>
                </div>

                {/* Skills Required */}
                {job.skills && job.skills.length > 0 && (<div className="mb-8">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Skills Required</div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (<span key={index} className="px-3 py-1 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium shadow-sm">
                      {skill}
                    </span>))}
                  </div>
                </div>)}

                {/* Apply Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`w-full py-4 rounded-xl transition-all font-bold text-lg shadow-xl ${hasApplied
                      ? 'bg-green-600 text-white cursor-default shadow-green-200'
                      : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'
                    }`}
                >
                  {hasApplied ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Applied
                    </span>
                  ) : (
                    'Apply Now'
                  )}
                </motion.button>
              </motion.div>

              {/* Hiring Manager */}
              {job.hiringManager && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-purple-700 font-bold text-xl">{job.hiringManager.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-0.5">Hiring Manager</div>
                    <div className="font-bold text-gray-900 truncate">{job.hiringManager.name}</div>
                    <div className="text-sm text-gray-500 truncate">{job.hiringManager.role}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </motion.div>);
}