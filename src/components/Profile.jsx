import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, Phone, MapPin, Briefcase, Save, Loader2, Edit2, Link as LinkIcon, Calendar, Building, School, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        title: '',
        bio: '',
        phone: '',
        location: '',
        avatar: '',
        website: ''
    });
    const [stats, setStats] = useState({
        appliedCount: 0,
        resumeScore: 0
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Load User Data
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Load Real Stats
        const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs') || '[]');
        const resumeData = JSON.parse(localStorage.getItem('resume_score') || 'null');

        setStats({
            appliedCount: appliedJobs.length,
            resumeScore: resumeData ? resumeData.score : 0
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size too large. Please select an image under 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(user));
            setIsSaving(false);
            setIsEditing(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#F3F2EF] pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Profile Column */}
                    <div className="lg:col-span-8 space-y-4">

                        {/* Profile Header Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative"
                        >
                            {/* Banner */}
                            <div className="h-48 bg-gradient-to-r from-slate-700 to-slate-600 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                            </div>

                            <div className="px-6 pb-6">
                                {/* Avatar & Edit Button */}
                                <div className="flex justify-between items-start -mt-16 mb-4 relative z-10">
                                    <div className="relative group">
                                        <div className="w-40 h-40 rounded-full border-[6px] border-white bg-white shadow-sm overflow-hidden flex items-center justify-center">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-20 h-20 text-gray-300" />
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
                                            >
                                                <Camera className="w-5 h-5" />
                                            </button>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                                    </div>

                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="mt-20 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                {/* Basic Info - View Mode */}
                                {!isEditing ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name || 'Your Name'}</h1>
                                            <p className="text-xl text-gray-600 leading-snug">{user.title || 'Add your job title'}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span>{user.location || 'Add location'}</span>
                                            </div>
                                            {(user.email || user.phone) && <span className="text-blue-600 font-bold cursor-pointer hover:underline">Contact info</span>}
                                        </div>

                                        {/* Stats Row - Conditionally Rendered */}
                                        {(stats.appliedCount > 0 || stats.resumeScore > 0) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="flex gap-4 mt-6 pt-6 border-t border-gray-100"
                                            >
                                                {stats.appliedCount > 0 && (
                                                    <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                            <Briefcase className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-gray-900">{stats.appliedCount}</div>
                                                            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Jobs Applied</div>
                                                        </div>
                                                    </div>
                                                )}

                                                {stats.resumeScore > 0 && (
                                                    <div className="flex-1 bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                                            <Sparkles className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-gray-900">{stats.resumeScore}%</div>
                                                            <div className="text-xs font-bold text-purple-600 uppercase tracking-wide">Resume Score</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    /* Edit Mode Form */
                                    <form onSubmit={handleSubmit} className="space-y-6 mt-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                                <input type="text" name="name" value={user.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Headline / Title</label>
                                                <input type="text" name="title" value={user.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Location</label>
                                                <input type="text" name="location" value={user.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                                <input type="email" name="email" value={user.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                            <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="text-gray-600">Cancel</Button>
                                            <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* About Section */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">About</h2>
                                {!isEditing && user.bio && (
                                    <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={user.bio}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Tell your professional story..."
                                />
                            ) : (
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {user.bio || "No description provided."}
                                </p>
                            )}
                        </motion.div>

                        {/* Experience Placeholder */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                            </div>

                            {/* Empty State / Placeholder */}
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Building className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Software Engineer</h3>
                                    <p className="text-sm text-gray-600">Company Name · Full-time</p>
                                    <p className="text-xs text-gray-500 mt-1">Jan 2023 - Present · 1 yr 2 mos</p>
                                    <p className="text-sm text-gray-500 mt-2">Add your experience to showcase your career history.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Placeholder */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <School className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">University / College</h3>
                                    <p className="text-sm text-gray-600">Bachelor's Degree, Computer Science</p>
                                    <p className="text-xs text-gray-500 mt-1">2019 - 2023</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        {/* Dashboard (Private) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Private Dashboard</h3>
                            <p className="text-xs text-gray-500 mb-4">Only you can see this</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Profile views</div>
                                        <div className="text-xs text-gray-500">12 people viewed your profile</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Job opportunities</div>
                                        <div className="text-xs text-gray-500">3 roles match your profile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
