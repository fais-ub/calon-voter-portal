import React from 'react';
import { Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Column 1: Institution */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-sm">Universitas Brawijaya</h3>
            <p className="text-slate-400 leading-relaxed">
              Global Partnership and Reputation Office
            </p>
            <div className="flex items-start gap-2 text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-ub-gold-500 shrink-0 mt-0.5" />
              <span>Jl. Veteran, Malang 65145, East Java, Indonesia</span>
            </div>
          </div>

          {/* Column 2: Official Contact */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-sm">Official Inquiries</h3>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-ub-gold-500 shrink-0" />
              <a href="mailto:reputation@ub.ac.id" className="hover:text-ub-gold-400 transition-colors">
                reputation@ub.ac.id
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed">
              For verification questions or survey inquiries regarding QS WUR nomination.
            </p>
          </div>

          {/* Column 3: QS Compliance & Privacy */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-ub-gold-400" />
              QS Compliance & Privacy
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Compliant with the General Data Protection Regulation (GDPR) and the Indonesian Personal Data Protection (UU PDP) Act. Your information is solely utilized for academic survey invitations.
            </p>
            <a
              href="https://www.topuniversities.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ub-gold-400 hover:underline pt-1"
            >
              <span>Learn more about QS World University Rankings</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p>© {new Date().getFullYear()} Universitas Brawijaya. All rights reserved.</p>
          <p className="text-slate-400">
            Academic Voter Self-Registration System • Independent Deployment
          </p>
        </div>
      </div>
    </footer>
  );
};
