import { AcademicTitle, QSBroadSubject } from '../types';

export const ACADEMIC_TITLES: AcademicTitle[] = [
  'Prof.',
  'Assoc. Prof.',
  'Dr.',
  'Mr.',
  'Ms.',
];

export interface SubjectOption {
  value: QSBroadSubject;
  label: string;
  description: string;
  weightInfo: string;
}

export const QS_BROAD_SUBJECTS: SubjectOption[] = [
  {
    value: 'Arts & Humanities',
    label: 'Arts & Humanities',
    description: 'Architecture, Art & Design, History, Linguistics, Philosophy, Literature, Performing Arts',
    weightInfo: 'QS Subject Weight 20%',
  },
  {
    value: 'Engineering & Technology',
    label: 'Engineering & Technology',
    description: 'Computer Science, Mechanical, Civil, Electrical, Chemical, Mining, Petroleum Engineering',
    weightInfo: 'QS Subject Weight 20%',
  },
  {
    value: 'Life Sciences & Medicine',
    label: 'Life Sciences & Medicine',
    description: 'Medicine, Pharmacy, Biological Sciences, Agriculture & Forestry, Nursing, Veterinary Science',
    weightInfo: 'QS Subject Weight 20%',
  },
  {
    value: 'Natural Sciences',
    label: 'Natural Sciences',
    description: 'Chemistry, Earth & Marine Sciences, Environmental Sciences, Geography, Materials, Mathematics, Physics',
    weightInfo: 'QS Subject Weight 20%',
  },
  {
    value: 'Social Sciences & Management',
    label: 'Social Sciences & Management',
    description: 'Business & Management, Accounting & Finance, Economics, Education, Law, Politics, Sociology',
    weightInfo: 'QS Subject Weight 20%',
  },
];

// Domains rejected by QS for academic reputation (must be institutional)
export const FORBIDDEN_PUBLIC_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.id',
  'yahoo.co.uk',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'mail.ru',
  'qq.com',
  '163.com',
  'yandex.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
];

// Self-affiliation rule: Civitas UB are prohibited from being UB's Academic Voter
export const FORBIDDEN_SELF_AFFILIATION_DOMAINS = [
  'ub.ac.id',
];

export const POPULAR_COUNTRIES = [
  'Australia',
  'United States',
  'United Kingdom',
  'Japan',
  'Malaysia',
  'Singapore',
  'Germany',
  'Netherlands',
  'Canada',
  'South Korea',
  'China',
  'France',
  'Taiwan',
  'Thailand',
  'Indonesia',
  'New Zealand',
  'Switzerland',
  'Sweden',
  'Saudi Arabia',
  'United Arab Emirates',
  'India',
  'Italy',
  'Spain',
  'Other',
];
