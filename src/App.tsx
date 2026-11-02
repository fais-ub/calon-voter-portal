import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VoterForm } from './components/VoterForm';
import { SuccessView } from './components/SuccessView';
import { AcademicVoterSubmission } from './types';
import { isFirebaseConfigured } from './firebase';
import { Info } from 'lucide-react';

export const App: React.FC = () => {
  const [submittedVoter, setSubmittedVoter] = useState<AcademicVoterSubmission | null>(null);

  const handleSuccess = (submission: AcademicVoterSubmission) => {
    setSubmittedVoter(submission);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedVoter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Official Header */}
      <Header />

      {/* Demo Mode Notice (Only shown if Firebase credentials are not yet entered) */}
      {!isFirebaseConfigured && (
        <div className="bg-ub-blue-900 text-white text-xs py-2 px-4 border-b border-ub-gold-500/40">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-ub-gold-400 shrink-0" />
              <span>
                <strong>System Notice:</strong> Running in standalone mode. To sync live with your Firebase project, fill in <code className="bg-black/30 px-1 py-0.5 rounded text-ub-gold-300">.env</code> credentials.
              </span>
            </div>
            <span className="hidden sm:inline-block bg-ub-gold-500/20 text-ub-gold-400 border border-ub-gold-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Standalone Active
            </span>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {submittedVoter ? (
          <SuccessView submission={submittedVoter} onReset={handleReset} />
        ) : (
          <VoterForm onSuccess={handleSuccess} />
        )}
      </main>

      {/* Official Footer */}
      <Footer />
    </div>
  );
};

export default App;
