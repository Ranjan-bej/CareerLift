import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Mail, Phone, MapPin, Briefcase, Save, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

export function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        title: '',
        bio: '',
        phone: '',
        location: '',
        avatar: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
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

        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(user));
            setIsSaving(false);
            // Optional: Show success toast
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-6 py-12"
        >
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                {/* Cover Photo / Header */}
                <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-600 relative">
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="px-8 pb-12">
                    {/* Avatar Section */}
                    <div className="relative -mt-20 mb-8 flex flex-col items-center md:items-start">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-20 h-20 text-gray-300" />
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-purple-600 transition-colors border border-gray-100 group-hover:scale-110"
                            >
                                <Camera className="w-5 h-5" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name || 'Your Name'}</h1>
                                <p className="text-gray-500">{user.title || 'Job Title'}</p>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Personal Info</h2>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={user.title}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none"
                                            placeholder="Software Engineer"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={user.bio}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none resize-none"
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Contact Details</h2>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={user.location}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition outline-none"
                                            placeholder="San Francisco, CA"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
