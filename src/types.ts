export type AcademicTitle = 'Prof.' | 'Assoc. Prof.' | 'Dr.' | 'Mr.' | 'Ms.';

export type QSBroadSubject =
  | 'Arts & Humanities'
  | 'Engineering & Technology'
  | 'Life Sciences & Medicine'
  | 'Natural Sciences'
  | 'Social Sciences & Management';

export interface AcademicVoterSubmission {
  id?: string;
  title: AcademicTitle;
  fullName: string;
  jobTitle?: string;
  campus: string; // Institution / University
  country: string;
  facultyDepartment?: string;
  broadSubject: QSBroadSubject;
  email: string;
  whatsapp?: string;
  idCardImageUrl?: string;
  consentGiven: boolean;
  submittedAt?: Date | string;
  status: 'pending' | 'verified' | 'rejected';
  type: 'academic';
  source: 'public_portal';
}

export interface ValidationError {
  field: string;
  message: string;
}
