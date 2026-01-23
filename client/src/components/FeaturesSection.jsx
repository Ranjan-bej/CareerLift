import { FileText, DollarSign, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
export function FeaturesSection({ onNavigateToJobBoard, onNavigateToBeatTheAlgorithm }) {
    const features = [
        {
            icon: FileText,
            color: 'from-blue-400 to-blue-600',
            title: 'Curated Job Board',
            description: 'Stop scrolling through spam. Find verified tours, curated filtered by skills, remote status, and tech stack.',
            onClick: onNavigateToJobBoard,
        },
        {
            icon: DollarSign,
            color: 'from-emerald-400 to-emerald-600',
            title: 'Beat The Algorithm',
            description: '75% of resumes are rejected by bots. Get a real-time score and keyword analysis to pass the screen.',
            onClick: onNavigateToBeatTheAlgorithm,
        },
        {
            icon: Users,
            color: 'from-purple-400 to-purple-600',
            title: 'Accelerate Practice',
            description: "Don't interview alone. Match with peers, tackle leet-code hard problems & unlock your next big idea.",
        },
    ];
    return (<section className="max-w-7xl mx-auto px-6 pt-8 pb-16">
      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
            const Icon = feature.icon;
            return (<div key={index} onClick={feature.onClick} className={`bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 border border-purple-200 hover:shadow-lg transition ${feature.onClick ? 'cursor-pointer hover:border-purple-300' : ''}`}>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white"/>
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>);
        })}
      </div>

      {/* Section Header */}
      <div className="text-center mb-12 mt-16">
        <h2 className="mb-4">Everything you need to get hired</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've got tools that brainstorm your next interview idea, optimize your resume around job
          descriptions, and track applied jobs.
        </p>
      </div>

      {/* Dashboard Mockup */}
      <div className="relative max-w-5xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
          <ImageWithFallback src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" alt="Dashboard Preview" className="w-full rounded-xl shadow-lg"/>
        </div>
      </div>
    </section>);
}
