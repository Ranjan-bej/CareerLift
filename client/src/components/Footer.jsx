import { Rocket, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const companyLogos = ['Google', 'Apple', 'Microsoft', 'Meta', 'Amazon', 'Netflix'];
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Trusted By Section */}
      <div className="border-b border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-400 text-sm mb-6">
            TRUSTED BY CANDIDATES WHO LANDED AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companyLogos.map((company) => (<div key={company} className="text-gray-500 text-sm">
              {company}
            </div>))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[#ffc9e0] via-[#d4b5ff] to-[#a8d5ff] p-2 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">CareerLift</span>
            </div>
            <p className="text-gray-400 text-sm">
              Built for developers, by developers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Hire Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  ATS Checker
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Jobs */}
          <div>
            <h4 className="text-white mb-4">Jobs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Remote Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tech Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          © 2026 CareerLift. All rights reserved.
        </div>
      </div>
    </footer>);
}
