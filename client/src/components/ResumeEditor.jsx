import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Play, FileText, Loader2, AlertCircle, CheckCircle2, Copy, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { resumeTemplates } from '../data/resumeTemplates';
import Editor from '@monaco-editor/react';

const LATEX_API_URL = 'https://latex.ytotech.com/builds/sync';

export function ResumeEditor() {
    const navigate = useNavigate();
    const { templateId } = useParams();

    const template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];

    const [latexCode, setLatexCode] = useState(() => {
        // Try to load saved code for this template
        const savedCode = localStorage.getItem(`latex_${templateId}`);
        return savedCode || template.latex;
    });

    const [pdfUrl, setPdfUrl] = useState(null);
    const [isCompiling, setIsCompiling] = useState(false);
    const [compileError, setCompileError] = useState(null);
    const [compileSuccess, setCompileSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    // Auto-save code to localStorage
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(`latex_${templateId}`, latexCode);
        }, 1000);
        return () => clearTimeout(timer);
    }, [latexCode, templateId]);

    const compileLatex = useCallback(async () => {
        setIsCompiling(true);
        setCompileError(null);
        setCompileSuccess(false);

        try {
            const response = await fetch(LATEX_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    compiler: 'pdflatex',
                    resources: [
                        {
                            main: true,
                            content: latexCode,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Compilation failed');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Revoke old URL to prevent memory leaks
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }

            setPdfUrl(url);
            setCompileSuccess(true);
            setTimeout(() => setCompileSuccess(false), 3000);
        } catch (error) {
            console.error('Compilation error:', error);
            setCompileError(error.message || 'Failed to compile LaTeX. Please check your code for errors.');
        } finally {
            setIsCompiling(false);
        }
    }, [latexCode, pdfUrl]);

    const downloadPdf = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(latexCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const resetToTemplate = () => {
        setLatexCode(template.latex);
        localStorage.removeItem(`latex_${templateId}`);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#F8FAFC] flex flex-col"
        >
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/resume-templates')}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${template.primaryColor}, ${template.primaryColor}cc)` }}
                        >
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-semibold tracking-tight">
                                {template.name} Template
                            </h1>
                            <p className="text-xs text-gray-500">resume.tex</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={copyCode}
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                        onClick={resetToTemplate}
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                    <div className="w-px h-6 bg-gray-200 mx-2" />
                    <Button
                        onClick={compileLatex}
                        disabled={isCompiling}
                        className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white gap-2 shadow-lg shadow-orange-200"
                    >
                        {isCompiling ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Compiling...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                Compile
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={downloadPdf}
                        disabled={!pdfUrl}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 shadow-lg shadow-purple-200 disabled:opacity-50"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                </div>
            </motion.div>

            {/* Status Bar */}
            {(compileError || compileSuccess) && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-4 py-2 flex items-center gap-2 text-sm ${compileError
                        ? 'bg-red-50 text-red-600 border-b border-red-100'
                        : 'bg-green-50 text-green-600 border-b border-green-100'
                        }`}
                >
                    {compileError ? (
                        <>
                            <AlertCircle className="w-4 h-4" />
                            <span className="truncate">{compileError}</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Compilation successful!</span>
                        </>
                    )}
                </motion.div>
            )}

            {/* Main Content - Editor and Preview */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className="w-1/2 flex flex-col border-r border-gray-200">
                    <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-gray-600 text-sm ml-2 font-medium">Editor</span>
                    </div>
                    <div className="flex-1 bg-white">
                        <Editor
                            height="100%"
                            defaultLanguage="latex"
                            language="latex"
                            theme="light"
                            value={latexCode}
                            onChange={(value) => setLatexCode(value || '')}
                            options={{
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
                                minimap: { enabled: true },
                                lineNumbers: 'on',
                                wordWrap: 'on',
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 16 },
                                suggestOnTriggerCharacters: true,
                                quickSuggestions: true,
                                tabSize: 2,
                            }}
                        />
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="w-1/2 flex flex-col bg-gray-50">
                    <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-gray-600 text-sm ml-2 font-medium">PDF Preview</span>
                        </div>
                        {pdfUrl && (
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-600 hover:text-purple-700 underline font-medium"
                            >
                                Open in new tab
                            </a>
                        )}
                    </div>
                    <div className="flex-1 overflow-hidden p-4">
                        {pdfUrl ? (
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-200"
                                title="PDF Preview"
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 bg-white rounded-xl border border-gray-200">
                                <div className="w-24 h-32 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg mb-6 flex items-center justify-center border border-orange-100">
                                    <FileText className="w-10 h-10 text-orange-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Preview Yet</h3>
                                <p className="text-center text-sm max-w-xs text-gray-500">
                                    Click the <span className="text-orange-500 font-semibold">Compile</span> button to generate a PDF preview of your resume.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs px-4 py-1.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-medium">LaTeX</span>
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>{latexCode.split('\n').length} lines</span>
                    <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Auto-saved
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
