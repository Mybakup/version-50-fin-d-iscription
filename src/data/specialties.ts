export interface Specialty {
  id: string;
  name: string;
  popular?: boolean;
}

export const specialties: Specialty[] = [
  // Spécialités les plus consultées
  { id: 'general', name: 'Médecin Généraliste', popular: true },
  { id: 'dentist', name: 'Dentiste', popular: true },
  { id: 'pediatrician', name: 'Pédiatre', popular: true },

  // Liste complète par ordre alphabétique
  { id: 'acupuncturist', name: 'Acupuncteur' },
  { id: 'angiologist', name: 'Engiologue' },
  { id: 'cardiologist', name: 'Cardiologue' },
  { id: 'physiotherapist', name: 'Kinésithérapeute' },
  { id: 'orthopedic-surgeon', name: 'Chirurgien orthopédique' },
  { id: 'ent', name: 'ORL' },
  { id: 'dermatologist', name: 'Dermatologue' },
  { id: 'nutritionist', name: 'Nutritionniste' },
  { id: 'dietician', name: 'Diététien' },
  { id: 'endocrinologist', name: 'Endocrinologue' },
  { id: 'ergotherapist', name: 'Ergothérapeute' },
  { id: 'ethiopath', name: 'Ethiopathe' },
  { id: 'gynecologist', name: 'Gynécologue' },
  { id: 'homeopath', name: 'Homéopathe' },
  { id: 'hypnotherapist', name: 'Hypnothérapeute' },
  { id: 'nurse', name: 'Infirmier' },
  { id: 'naturopath', name: 'Naturopathe' },
  { id: 'nephrologist', name: 'Néphrologue' },
  { id: 'neurologist', name: 'Neurologue' },
  { id: 'speech-therapist', name: 'Orthophoniste' },
  { id: 'podiatrist', name: 'Podologue' },
  { id: 'psychiatrist', name: 'Psychiatre' },
  { id: 'pedicurist', name: 'Pédicure' },
  { id: 'sophrologist', name: 'Sophrologue' }
];