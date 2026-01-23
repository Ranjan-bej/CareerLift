import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
export function TestimonialCard() {
    return (<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (<Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400"/>))}
      </div>

      {/* Testimonial Text */}
      <p className="mb-6 leading-relaxed">
        "I doubled my interview calls in 2 weeks using CareerLift. The AI resume optimization is a game-changer for anyone in tech."
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <ImageWithFallback src="https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDcxMDc3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Sarah Jenkins" className="w-12 h-12 rounded-full object-cover"/>
        <div>
          <div>Sarah Jenkins</div>
          <div className="text-sm text-white/80">Frontend Developer @ TechFlow</div>
        </div>
      </div>
    </div>);
}
