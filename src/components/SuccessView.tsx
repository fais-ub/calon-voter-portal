import React from 'react';
import { CheckCircle2, Award, Mail, Calendar, ArrowLeft, Download } from 'lucide-react';
import { AcademicVoterSubmission } from '../types';

interface SuccessViewProps {
  submission: AcademicVoterSubmission;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ submission, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
            Nomination Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Thank You, {submission.title} {submission.fullName}!
          </h2>
          <p className="text-emerald-100 text-sm mt-2 max-w-lg mx-auto">
            Your academic nomination has been officially registered on behalf of Universitas Brawijaya for the QS World University Rankings.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Summary Box */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-ub-gold-600" />
              Registered Nomination Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Academic Title & Name</p>
                <p className="font-semibold text-slate-800">{submission.title} {submission.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">QS Broad Subject Area</p>
                <p className="font-semibold text-ub-blue-800">{submission.broadSubject}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Institution & Country</p>
                <p className="font-semibold text-slate-800">{submission.campus}, {submission.country}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Official Registered Email</p>
                <p className="font-semibold text-slate-800 font-mono text-xs sm:text-sm bg-white p-2 rounded border border-slate-200 inline-block mt-0.5">
                  {submission.email}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps Guide */}
          <div className="space-y-3 border-t border-slate-200 pt-5">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ub-blue-700" />
              What Happens Next?
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-ub-blue-200">
                  1
                </div>
                <div>
                  <strong className="text-slate-800">Verification & Submission to QS Hub</strong>:
                  Our global ranking team will compile the academic nominee list following strict QS guidelines.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-ub-blue-200">
                  2
                </div>
                <div>
                  <strong className="text-slate-800">Direct Invitation from QS Quacquarelli Symonds</strong>:
                  During the official global survey cycle (typically January – April), you will receive an invitation email containing a secure survey link directly from QS (usually sent from <span className="font-mono text-xs text-ub-blue-800 bg-slate-100 px-1 py-0.5 rounded">rankings@qs.com</span>).
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-ub-blue-200">
                  3
                </div>
                <div>
                  <strong className="text-slate-800">Complete the 5-Minute Survey</strong>:
                  Follow the instructions inside the QS email to express your academic feedback and evaluation.
                </div>
              </div>
            </div>
          </div>

          {/* Notice Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Please whitelist emails from <span className="font-semibold">qs.com</span> and <span className="font-semibold">reputation@ub.ac.id</span> in your institutional mailbox to prevent the survey invitation from being filtered into spam.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs sm:text-sm hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Submit Another Nomination</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ub-blue-800 text-white font-medium text-xs sm:text-sm hover:bg-ub-blue-900 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Print / Save Confirmation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
