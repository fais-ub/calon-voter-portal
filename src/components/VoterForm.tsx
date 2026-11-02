import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  User,
  Building2,
  Mail,
  Phone,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  CheckCircle,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { AcademicVoterSubmission, AcademicTitle, QSBroadSubject } from '../types';
import {
  ACADEMIC_TITLES,
  QS_BROAD_SUBJECTS,
  FORBIDDEN_PUBLIC_DOMAINS,
  FORBIDDEN_SELF_AFFILIATION_DOMAINS,
  POPULAR_COUNTRIES,
} from '../constants/qs';
import { submitAcademicVoter } from '../firebase';

interface VoterFormProps {
  onSuccess: (submission: AcademicVoterSubmission) => void;
}

export const VoterForm: React.FC<VoterFormProps> = ({ onSuccess }) => {
  // Form state
  const [title, setTitle] = useState<AcademicTitle>('Prof.');
  const [fullName, setFullName] = useState('');
  const [campus, setCampus] = useState('');
  const [country, setCountry] = useState('Australia');
  const [customCountry, setCustomCountry] = useState('');
  const [broadSubject, setBroadSubject] = useState<QSBroadSubject>('Engineering & Technology');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // Validation & Submission state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);

  // Email validation check
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setEmailWarning(null);

    const emailLower = val.toLowerCase().trim();
    if (emailLower.includes('@')) {
      const domain = emailLower.split('@')[1];

      // Check forbidden public domain
      if (FORBIDDEN_PUBLIC_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d))) {
        setEmailWarning(
          'Notice: QS Quacquarelli Symonds strictly rejects personal email addresses (@gmail, @yahoo, etc.). Please use your official university or institutional email.'
        );
        return;
      }

      // Check self-affiliation
      if (FORBIDDEN_SELF_AFFILIATION_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d))) {
        setEmailWarning(
          'Prohibited: QS integrity rules forbid self-affiliation. Universitas Brawijaya faculty and staff members cannot act as Academic Voters for UB.'
        );
        return;
      }
    }
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validations
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!campus.trim()) {
      setFormError('Please provide your university or research institution name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid official institutional email.');
      return;
    }

    const emailLower = email.toLowerCase().trim();
    const domain = emailLower.split('@')[1];

    if (FORBIDDEN_PUBLIC_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d))) {
      setFormError(
        'Submission blocked: QS World University Rankings requires an official institutional email. Personal email services (@gmail, @yahoo, etc.) will be rejected by QS.'
      );
      return;
    }

    if (FORBIDDEN_SELF_AFFILIATION_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d))) {
      setFormError(
        'Submission blocked: Self-affiliation conflict. Academic voters must be affiliated with an external institution outside Universitas Brawijaya.'
      );
      return;
    }

    if (!consentGiven) {
      setFormError('You must agree to the QS Survey Participation Consent declaration to proceed.');
      return;
    }

    const resolvedCountry = country === 'Other' && customCountry.trim() ? customCountry.trim() : country;

    const submissionPayload: AcademicVoterSubmission = {
      title,
      fullName: fullName.trim(),
      campus: campus.trim(),
      country: resolvedCountry,
      broadSubject,
      email: emailLower,
      whatsapp: whatsapp.trim(),
      consentGiven,
      status: 'pending',
      type: 'academic',
      source: 'public_portal',
    };

    setSubmitting(true);
    try {
      const res = await submitAcademicVoter(submissionPayload);
      if (res.success) {
        onSuccess({ ...submissionPayload, id: res.id });
      } else {
        setFormError(res.error || 'Failed to submit registration. Please check your connection and try again.');
      }
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Intro Context Callout */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-ub-blue-800 text-white rounded-lg shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 text-ub-gold-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-ub-blue-900">
              Academic Peer Nomination for Universitas Brawijaya
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Universitas Brawijaya cordially invites international and domestic academic peers, partner researchers, and collaborating scholars to register as <strong className="text-slate-800">QS World University Rankings Academic Voters</strong>. Your feedback empowers higher education excellence globally.
            </p>
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      {formError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to submit nomination</p>
            <p className="text-xs text-red-700 mt-0.5">{formError}</p>
          </div>
        </div>
      )}

      {/* ================= SECTION 1: PERSONAL IDENTITY ================= */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Academic Identity</h3>
            <p className="text-xs text-slate-500">Your title, legal name, and academic credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Title / Salutation */}
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Title / Salutation <span className="text-red-500">*</span>
            </label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value as AcademicTitle)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-ub-blue-600 focus:border-transparent outline-none transition"
            >
              {ACADEMIC_TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Johnathan Smith, Ph.D."
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-ub-blue-600 focus:border-transparent outline-none transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Please provide your full legal name as acknowledged in academic publications.</p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: INSTITUTIONAL AFFILIATION ================= */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Institution & Affiliation</h3>
            <p className="text-xs text-slate-500">Your primary university or research organization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Institution Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              University / Research Institution <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                placeholder="e.g. University of Melbourne / National University of Singapore"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-ub-blue-600 focus:border-transparent outline-none transition"
              />
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Country / Territory */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Country / Territory <span className="text-red-500">*</span>
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-ub-blue-600 focus:border-transparent outline-none transition"
            >
              {POPULAR_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {country === 'Other' && (
              <input
                type="text"
                required
                placeholder="Specify country name"
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                className="mt-2 w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: QS BROAD SUBJECT AREA ================= */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">QS Field of Expertise</h3>
            <p className="text-xs text-slate-500">Select one of the 5 official QS Broad Subject Areas matching your primary discipline</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {QS_BROAD_SUBJECTS.map((item) => {
            const isSelected = broadSubject === item.value;
            return (
              <label
                key={item.value}
                className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-ub-blue-700 bg-ub-blue-50/50 ring-2 ring-ub-blue-600/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="broadSubject"
                  value={item.value}
                  checked={isSelected}
                  onChange={() => setBroadSubject(item.value)}
                  className="mt-1 w-4 h-4 text-ub-blue-700 focus:ring-ub-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-800">{item.label}</span>
                    <span className="text-[10px] font-semibold text-ub-gold-700 bg-ub-gold-50 px-2 py-0.5 rounded border border-ub-gold-200">
                      {item.weightInfo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 4: CONTACT & OFFICIAL EMAIL ================= */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-ub-blue-50 text-ub-blue-800 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Official Contact Information</h3>
            <p className="text-xs text-slate-500">QS survey invitation will be delivered to this verified address</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Institutional Email */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>
                Official Institutional Email <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-amber-700 font-medium">Must be university/work domain</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="e.g. j.smith@unimelb.edu.au or professor@nus.edu.sg"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:ring-2 outline-none transition ${
                  emailWarning
                    ? 'border-amber-400 focus:ring-amber-500'
                    : 'border-slate-300 focus:ring-ub-blue-600 focus:border-transparent'
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            {/* Email warning callout */}
            {emailWarning && (
              <div className="mt-2 p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{emailWarning}</p>
              </div>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              Personal addresses such as Gmail, Yahoo, or Outlook will be disqualified during QS screening.
            </p>
          </div>

          {/* WhatsApp / Phone (Optional) */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              WhatsApp / Mobile Phone <span className="text-slate-400 font-normal">(Optional, for reminder)</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+61 400 123 456 or +62 812 3456 7890"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-ub-blue-600 focus:border-transparent outline-none transition"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Used strictly by the Universitas Brawijaya WCU Taskforce for sending a polite reminder when QS releases the survey.
            </p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 5: CONSENT DECLARATION ================= */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-ub-blue-800 text-ub-gold-400 flex items-center justify-center font-bold text-sm shrink-0 border border-ub-gold-500/30">
            5
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-ub-gold-400" />
              QS Survey Participation Consent
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with international privacy standards and QS Quacquarelli Symonds policy, your nomination requires explicit prior consent to receive the academic evaluation survey.
            </p>
          </div>
        </div>

        <label className="flex items-start gap-3 p-4 bg-slate-800/80 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition">
          <input
            type="checkbox"
            required
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="w-4 h-4 text-ub-gold-500 rounded border-slate-600 focus:ring-ub-gold-400 shrink-0 mt-0.5"
          />
          <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            I hereby agree to be nominated as an <strong className="text-white">Academic Voter</strong> on behalf of Universitas Brawijaya and consent to receiving the official QS World University Rankings survey invitation email from QS Quacquarelli Symonds. <span className="text-red-400">*</span>
          </span>
        </label>
      </div>

      {/* ================= SUBMIT BUTTON ================= */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting || !consentGiven}
          className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white transition-all shadow-lg flex items-center justify-center gap-2 border ${
            !consentGiven
              ? 'bg-slate-400 cursor-not-allowed border-slate-300 opacity-60'
              : 'bg-gradient-to-r from-ub-blue-800 via-ub-blue-700 to-ub-blue-900 hover:from-ub-blue-900 hover:to-ub-blue-950 hover:shadow-xl active:scale-[0.99] border-ub-gold-500/30 cursor-pointer'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-ub-gold-400" />
              <span>Submitting Nomination to Universitas Brawijaya...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-ub-gold-400" />
              <span>Submit Academic Voter Nomination</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5">
          {!consentGiven ? (
            <span className="text-amber-600 font-medium">
              * Please tick the consent checkbox above to activate the submit button
            </span>
          ) : (
            <>
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Encrypted transmission • Direct submission to Universitas Brawijaya Taskforce</span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};
