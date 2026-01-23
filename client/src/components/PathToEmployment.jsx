import { CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
export function PathToEmployment() {
    return (<section className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-[#d4b5ff] text-sm mb-2">LAND AT MAANG</p>
        <h2>Your path to employment</h2>
      </div>

      {/* Resume Upload Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h3 className="mb-4">Upload your resume and get instant feedback.</h3>
          <p className="text-gray-600 mb-6">
            Our advanced AI analyzes your resume against thousands of job descriptions to highlight
            missing keywords and formatting issues.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>
              <span>ATS compatibility check</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>
              <span>Keyword optimization</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0"/>
              <span>Formatting suggestions</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700">Resume</span>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="text-white">85%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-5/6"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-4/6"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-full"></div>
                  <div className="h-3 bg-gray-100 rounded-full w-3/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Peer Coding Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <ImageWithFallback src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Peer coding session" className="w-full rounded-2xl"/>
        </div>
        <div className="order-1 md:order-2">
          <h3 className="mb-4">Find a peer and code together.</h3>
          <p className="text-gray-600 mb-6">
            Mock interviews aren't just practice—they're proven to reduce anxiety. Match with your team. Solve algorithmic problems in a shared IDE with video and voice chat.
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-500 text-white px-6 py-3 rounded-lg hover:bg-fuchsia-400 hover:bg-none transition">
            Start practicing
            <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </section>);
}
