import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="gradient-ub text-white shadow-xl border-b border-ub-gold-500/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Institution Logo & Identity */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="/logo-ub.svg"
              alt="Universitas Brawijaya"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0 drop-shadow-md"
            />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-ub-gold-400">
                  World Class University
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-ub-gold-400"></span>
                <span className="text-xs text-blue-200">QS WUR 2026/2027</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Universitas Brawijaya
              </h1>
              <p className="text-xs text-blue-200/90 font-medium">
                Global Partnership and Reputation Office
              </p>
            </div>
          </div>

          {/* Academic Badge */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs text-blue-100 font-medium">
            <ShieldCheck className="w-4 h-4 text-ub-gold-400 shrink-0" />
            <span>Official Academic Nomination Portal</span>
          </div>
        </div>

        {/* Hero Banner Subtext */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center">
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <Globe className="w-4 h-4 text-ub-gold-400 shrink-0" />
            <span>QS World University Rankings • Academic Reputation (AR) Survey</span>
          </div>
        </div>
      </div>
    </header>
  );
};
