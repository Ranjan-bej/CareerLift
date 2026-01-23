import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertTriangle, Briefcase, X, Loader2, Sparkles, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../apiConfig';

export function BeatTheAlgorithm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('Initializing scan...');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(droppedFile);
      setAtsResult(null);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAtsResult(null);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const analyzeResume = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    const stages = [
      "Extracting text content...",
      "Identifying contact information...",
      "Analyzing keyword density...",
      "Checking formatting structure...",
      "comparing against industry standards...",
      "Calculating final ATS score..."
    ];

    let stageIndex = 0;
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          // Keep it at 90 until data arrives
          return 90;
        }
        // Update stage based on progress
        const currentStageIndex = Math.floor((prev / 90) * stages.length);
        if (stages[currentStageIndex]) {
          setAnalysisStage(stages[currentStageIndex]);
        }
        return prev + 2;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisProgress(100);
      clearInterval(progressInterval);

      // Artificial delay to show 100%
      setTimeout(() => {
        setAtsResult(data);
        localStorage.setItem('resume_score', JSON.stringify({
          score: data.score,
          date: new Date().toISOString()
        }));
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      console.error('Error analyzing resume:', error);
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFC]"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Beat The Algorithm
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!atsResult ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Hero Text */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6 border border-purple-100"
                >
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Resume Scanner
                </motion.div>
                <h2 className="mb-4 text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  Optimize your resume<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">for the machines.</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                  75% of resumes are rejected by ATS bots before a human ever sees them. Check your compatibility score in used seconds.
                </p>
              </div>

              {/* Upload Area */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
              >
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-[20px] p-16 text-center transition-all duration-300 border-2 border-dashed ${isDragging
                    ? 'border-purple-500 bg-purple-50/50 scale-[0.99] ring-4 ring-purple-100'
                    : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                >
                  {!isAnalyzing ? (
                    <div className="flex flex-col items-center gap-8">
                      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-purple-200 scale-110' : 'bg-gray-50'}`}>
                        {file ? (
                          <FileText className="w-10 h-10 text-purple-600" />
                        ) : (
                          <Upload className="w-10 h-10 text-gray-400" />
                        )}
                      </div>

                      <div>
                        {file ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-100 inline-flex items-center gap-4"
                          >
                            <FileText className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-gray-900">{file.name}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); setFile(null); }}
                              className="p-1 hover:bg-purple-100 rounded-full text-purple-400 hover:text-purple-700 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ) : (
                          <>
                            <p className="text-xl font-bold text-gray-900 mb-2">
                              Drag & drop your resume
                            </p>
                            <p className="text-gray-500">
                              Supported formats: PDF, DOCX
                            </p>
                          </>
                        )}
                      </div>

                      {!file && (
                        <div>
                          <p className="text-gray-400 text-sm mb-4 font-medium uppercase tracking-wide">Or</p>
                          <Button
                            onClick={handleBrowseClick}
                            className="bg-gray-900 hover:bg-black text-white px-8 py-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                          >
                            Browse Files
                          </Button>
                        </div>
                      )}

                      <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />

                      {file && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Button
                            onClick={analyzeResume}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-full md:w-auto"
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Run ATS Analysis
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={377}
                            strokeDashoffset={377 - (377 * analysisProgress) / 100}
                            className="text-purple-600 transition-all duration-300 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-700">{Math.round(analysisProgress)}%</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Resume...</h3>
                      <p className="text-purple-600 font-medium animate-pulse">{analysisStage}</p>
                      <p className="text-gray-400 text-sm mt-2">This usually takes about 5-10 seconds</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header result */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Analysis Report</h2>
                  <p className="text-gray-500 mt-1">based on standard ATS algorithms</p>
                </div>
                <Button
                  onClick={() => { setFile(null); setAtsResult(null); }}
                  variant="outline"
                  className="gap-2"
                >
                  Analyze New Resume
                </Button>
              </div>

              {/* Score Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-2 ${atsResult.score >= 80 ? 'bg-emerald-500' : atsResult.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`} />

                  <div className="relative mb-4">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black ${atsResult.score >= 80 ? 'bg-emerald-50 text-emerald-600' : atsResult.score >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                      {atsResult.score}
                    </div>
                    {atsResult.score >= 80 && (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white border-4 border-white"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">ATS Score</h3>
                  <p className={`font-medium ${atsResult.score >= 80 ? 'text-emerald-600' : atsResult.score >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                    {atsResult.score >= 80 ? 'Excellent' : atsResult.score >= 60 ? 'Good Start' : 'Needs Improvement'}
                  </p>
                </motion.div>

                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-3 gap-4 h-full">
                    {atsResult.apiSources.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">{source.name}</div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">{source.score}%</div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${source.score}%` }} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Critical Mistakes & Improvements Column */}
                <div className="space-y-6">
                  {/* Critical Errors */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Critical Issues
                    </h3>
                    <div className="space-y-4">
                      {atsResult.feedback.filter(i => i.type === 'error').length > 0 ? (
                        atsResult.feedback.filter(i => i.type === 'error').map((item, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-50">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="w-4 h-4 text-red-600" />
                            </div>
                            <p className="text-gray-800 leading-relaxed font-medium">{item.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                          No critical issues found! 🎉
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Improvements */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Recommended Improvements
                    </h3>
                    <div className="space-y-4">
                      {atsResult.feedback.filter(i => i.type === 'warning').map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-50">
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-amber-700 font-bold text-xs">{index + 1}</span>
                          </div>
                          <p className="text-gray-800 leading-relaxed font-medium">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Success & Profiles Column */}
                <div className="space-y-6">
                  {/* Successes */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      What You Did Well
                    </h3>
                    <div className="space-y-3">
                      {atsResult.feedback.filter(i => i.type === 'success').map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 text-emerald-800 bg-emerald-50/50 rounded-xl border border-emerald-50 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Profiles */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-500" />
                      Best Matched Roles
                    </h3>
                    <div className="space-y-3">
                      {atsResult.suitableProfiles.map((profile, index) => (
                        <div key={index} className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors cursor-default">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                              {profile.matchPercentage}%
                            </div>
                            <span className="font-bold text-gray-800">{profile.title}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


