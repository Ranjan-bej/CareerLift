import { CheckCircle } from 'lucide-react';
export function HeroSection() {
    return (<section className="max-w-7xl mx-auto px-6 py-16 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-purple-50 text-[#d4b5ff] px-4 py-2 rounded-full mb-6">
        <CheckCircle className="w-4 h-4"/>
        <span className="text-sm">AI Freelancers Get Developers</span>
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl mx-auto mb-4">
        Launch Your Tech Career with{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
          Confidence
        </span>
        .
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        The all-in-one ecosystem to find jobs, optimize your resume for ATS,
        and practice technical interviews with peers.
      </p>
    </section>);
}
