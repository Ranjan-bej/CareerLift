import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Sparkles, ArrowRight, Code2 } from 'lucide-react';
import { resumeTemplates } from '../data/resumeTemplates';

export function ResumeTemplates() {
    const navigate = useNavigate();
    const [hoveredTemplate, setHoveredTemplate] = useState(null);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    // Generate a simple visual preview from LaTeX code
    const renderMiniPreview = (template) => {
        const lines = template.latex.split('\n').filter(l => l.trim()).slice(0, 30);
        return (
            <div className="text-[6px] font-mono text-gray-400 leading-tight overflow-hidden">
                {lines.slice(0, 20).map((line, i) => (
                    <div key={i} className="truncate">
                        {line.substring(0, 50)}
                    </div>
                ))}
            </div>
        );
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
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-sm">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                Resume Templates
                            </h1>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-6 border border-orange-100"
                    >
                        <Code2 className="w-4 h-4" />
                        LaTeX Templates
                    </motion.div>
                    <h2 className="mb-4 text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                        Professional LaTeX <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">resume templates.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Choose a template, customize it in our LaTeX editor, and download a beautifully formatted PDF resume.
                    </p>
                </motion.div>

                {/* Template Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {resumeTemplates.map((template) => (
                        <motion.div
                            key={template.id}
                            variants={item}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onHoverStart={() => setHoveredTemplate(template.id)}
                            onHoverEnd={() => setHoveredTemplate(null)}
                            onClick={() => navigate(`/resume-editor/${template.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transition-shadow hover:shadow-2xl">
                                {/* Template Preview */}
                                <div
                                    className="relative h-64 overflow-hidden p-4"
                                    style={{ backgroundColor: `${template.primaryColor}08` }}
                                >
                                    {/* LaTeX Code Preview */}
                                    <div className="w-full h-full bg-white rounded-lg shadow-lg p-3 overflow-hidden border border-gray-200 transform transition-transform group-hover:scale-105">
                                        <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-100">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            <span className="text-[8px] text-gray-400 ml-2 font-mono">resume.tex</span>
                                        </div>
                                        {renderMiniPreview(template)}
                                    </div>

                                    {/* Overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-6 transition-opacity ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="text-white font-bold flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                            Open in Editor <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: template.primaryColor }}
                                        />
                                        <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {template.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white"
                >
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-2xl md:text-3xl font-bold">
                                Why LaTeX?
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 text-white/80">
                            <div>
                                <h4 className="font-semibold text-white mb-1">Professional Typography</h4>
                                <p className="text-sm">LaTeX produces beautifully typeset documents with consistent formatting.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">ATS-Friendly</h4>
                                <p className="text-sm">Clean PDF output that parses correctly in Applicant Tracking Systems.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Version Control</h4>
                                <p className="text-sm">Plain text format works perfectly with Git for tracking changes.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Industry Standard</h4>
                                <p className="text-sm">Widely used in academia, research, and technical fields.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
