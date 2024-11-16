import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Globe, MapPin, Loader2, GraduationCap, FileText, Clock } from 'lucide-react';

interface PracticeLocation {
  type: 'hospital' | 'clinic' | 'office';
  name: string;
  address: string;
}

interface OpeningHours {
  day: string;
  isOpen: boolean;
  morning: {
    start: string;
    end: string;
  };
  afternoon: {
    start: string;
    end: string;
  };
}

interface FormData {
  locations: PracticeLocation[];
  languages: string[];
  consultationType: 'office' | 'home' | 'both';
  description: string;
  qualifications: Array<{
    title: string;
    year: string;
  }>;
  medicalActs: Array<{
    name: string;
    price: string;
  }>;
  openingHours: OpeningHours[];
}

const defaultOpeningHours: OpeningHours[] = [
  { day: 'Lundi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  { day: 'Mardi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  { day: 'Mercredi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  { day: 'Jeudi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  { day: 'Vendredi', isOpen: true, morning: { start: '09:00', end: '12:00' }, afternoon: { start: '14:00', end: '18:00' } },
  { day: 'Samedi', isOpen: false, morning: { start: '', end: '' }, afternoon: { start: '', end: '' } },
  { day: 'Dimanche', isOpen: false, morning: { start: '', end: '' }, afternoon: { start: '', end: '' } }
];

export default function PractitionerInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    locations: [],
    languages: [],
    consultationType: 'office',
    description: '',
    qualifications: [],
    medicalActs: [],
    openingHours: defaultOpeningHours
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/practitioner-dashboard');
    } catch (error) {
      console.error('Error saving information:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { title: '', year: '' }]
    }));
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const updateQualification = (index: number, field: 'title' | 'year', value: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => 
        i === index ? { ...qual, [field]: value } : qual
      )
    }));
  };

  const addMedicalAct = () => {
    setFormData(prev => ({
      ...prev,
      medicalActs: [...prev.medicalActs, { name: '', price: '' }]
    }));
  };

  const removeMedicalAct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalActs: prev.medicalActs.filter((_, i) => i !== index)
    }));
  };

  const updateMedicalAct = (index: number, field: 'name' | 'price', value: string) => {
    setFormData(prev => ({
      ...prev,
      medicalActs: prev.medicalActs.map((act, i) => 
        i === index ? { ...act, [field]: value } : act
      )
    }));
  };

  const updateOpeningHours = (dayIndex: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      openingHours: prev.openingHours.map((day, i) => 
        i === dayIndex ? { ...day, [field]: value } : day
      )
    }));
  };

  const copyMondayHours = (targetDayIndex: number) => {
    const mondayHours = formData.openingHours[0];
    setFormData(prev => ({
      ...prev,
      openingHours: prev.openingHours.map((day, i) => 
        i === targetDayIndex ? {
          ...day,
          isOpen: mondayHours.isOpen,
          morning: { ...mondayHours.morning },
          afternoon: { ...mondayHours.afternoon }
        } : day
      )
    }));
  };

  const copyToWeekdays = () => {
    const mondayHours = formData.openingHours[0];
    setFormData(prev => ({
      ...prev,
      openingHours: prev.openingHours.map((day, i) => 
        i >= 1 && i <= 4 ? {
          ...day,
          isOpen: mondayHours.isOpen,
          morning: { ...mondayHours.morning },
          afternoon: { ...mondayHours.afternoon }
        } : day
      )
    }));
  };

  const copyToAllDays = () => {
    const mondayHours = formData.openingHours[0];
    setFormData(prev => ({
      ...prev,
      openingHours: prev.openingHours.map(day => ({
        ...day,
        isOpen: mondayHours.isOpen,
        morning: { ...mondayHours.morning },
        afternoon: { ...mondayHours.afternoon }
      }))
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/practitioner-signup')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Mes informations
            </h1>
          </div>
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-8"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description professionnelle */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Description professionnelle
              </h2>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
              rows={5}
              placeholder="Décrivez votre pratique, votre approche et votre expérience..."
            />
          </section>

          {/* Qualifications et diplômes */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-mybakup-blue" />
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Qualifications et diplômes
                </h2>
              </div>
              <button
                type="button"
                onClick={addQualification}
                className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.qualifications.map((qualification, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={qualification.title}
                    onChange={(e) => updateQualification(index, 'title', e.target.value)}
                    placeholder="Titre du diplôme"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <input
                    type="text"
                    value={qualification.year}
                    onChange={(e) => updateQualification(index, 'year', e.target.value)}
                    placeholder="Année"
                    className="w-32 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Actes médicaux */}
          <section className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-mybakup-blue" />
                <h2 className="text-lg font-semibold text-mybakup-blue">
                  Actes médicaux
                </h2>
              </div>
              <button
                type="button"
                onClick={addMedicalAct}
                className="flex items-center gap-2 text-mybakup-coral hover:text-mybakup-coral/80"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.medicalActs.map((act, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={act.name}
                    onChange={(e) => updateMedicalAct(index, 'name', e.target.value)}
                    placeholder="Nom de l'acte"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <input
                    type="text"
                    value={act.price}
                    onChange={(e) => updateMedicalAct(index, 'price', e.target.value)}
                    placeholder="Tarif"
                    className="w-32 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                  />
                  <button
                    type="button"
                    onClick={() => removeMedicalAct(index)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Horaires d'ouverture */}
          <section className="bg-white rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-mybakup-blue" />
              <h2 className="text-lg font-semibold text-mybakup-blue">
                Horaires d'ouverture
              </h2>
            </div>

            <div className="space-y-6">
              {formData.openingHours.map((day, index) => (
                <div key={day.day} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={day.isOpen}
                        onChange={(e) => updateOpeningHours(index, 'isOpen', e.target.checked)}
                        className="w-5 h-5 text-mybakup-coral rounded"
                      />
                      <span className="font-medium text-gray-700">{day.day}</span>
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => copyMondayHours(index)}
                        className="text-sm text-mybakup-coral hover:text-mybakup-coral/80"
                      >
                        Copier sur la journée du lundi
                      </button>
                    )}
                  </div>

                  {day.isOpen && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Matin
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={day.morning.start}
                            onChange={(e) => updateOpeningHours(index, 'morning', { ...day.morning, start: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                          />
                          <span className="text-gray-500 self-center">-</span>
                          <input
                            type="time"
                            value={day.morning.end}
                            onChange={(e) => updateOpeningHours(index, 'morning', { ...day.morning, end: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Après-midi
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={day.afternoon.start}
                            onChange={(e) => updateOpeningHours(index, 'afternoon', { ...day.afternoon, start: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                          />
                          <span className="text-gray-500 self-center">-</span>
                          <input
                            type="time"
                            value={day.afternoon.end}
                            onChange={(e) => updateOpeningHours(index, 'afternoon', { ...day.afternoon, end: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Boutons de copie globaux */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={copyToWeekdays}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Copier vers les jours ouvrés
                </button>
                <button
                  type="button"
                  onClick={copyToAllDays}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Copier vers toute la semaine
                </button>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-mybakup-coral text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Enregistrer les modifications'
            )}
          </button>
        </form>
      </main>
    </div>
  );
}