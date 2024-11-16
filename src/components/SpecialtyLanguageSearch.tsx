import React, { useState, useRef, useEffect } from 'react';
import { Search, Languages } from 'lucide-react';
import { specialties, Specialty } from '../data/specialties';

interface SpecialtyLanguageSearchProps {
  onSpecialtySelect: (specialty: Specialty) => void;
  onLanguageSelect: (language: string) => void;
}

const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

export default function SpecialtyLanguageSearch({ onSpecialtySelect, onLanguageSelect }: SpecialtyLanguageSearchProps) {
  const [activeField, setActiveField] = useState<'specialty' | 'language' | null>(null);
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const specialtyInputRef = useRef<HTMLInputElement>(null);
  const languageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const filteredLanguages = availableLanguages.filter(language =>
    language.name.toLowerCase().includes(languageSearch.toLowerCase())
  );

  const popularSpecialties = filteredSpecialties.filter(s => s.popular);
  const otherSpecialties = filteredSpecialties.filter(s => !s.popular);

  const handleSpecialtySelect = (specialty: Specialty) => {
    setSpecialtySearch(specialty.name);
    onSpecialtySelect(specialty);
    setActiveField(null);
  };

  const handleLanguageSelect = (language: { code: string; name: string; flag: string }) => {
    setLanguageSearch(language.name);
    onLanguageSelect(language.code);
    setActiveField(null);
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="flex divide-x divide-gray-200">
        {/* Specialty Search */}
        <div className="relative flex-1">
          <input
            ref={specialtyInputRef}
            type="text"
            value={specialtySearch}
            onChange={(e) => {
              setSpecialtySearch(e.target.value);
              setActiveField('specialty');
            }}
            onFocus={() => setActiveField('specialty')}
            placeholder="Spécialité médicale"
            className="w-full h-12 pl-4 pr-10 bg-transparent text-mybakup-blue focus:outline-none appearance-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Language Search */}
        <div className="relative flex-1">
          <input
            ref={languageInputRef}
            type="text"
            value={languageSearch}
            onChange={(e) => {
              setLanguageSearch(e.target.value);
              setActiveField('language');
            }}
            onFocus={() => setActiveField('language')}
            placeholder="Langue parlée"
            className="w-full h-12 pl-4 pr-10 bg-transparent text-mybakup-blue focus:outline-none appearance-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Languages className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Dropdown for Specialties */}
      {activeField === 'specialty' && (
        <div className="absolute z-10 w-1/2 mt-1 bg-white border border-gray-200 rounded-b-xl shadow-lg max-h-96 overflow-y-auto">
          {specialtySearch === '' && popularSpecialties.length > 0 && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              Les plus consultés
            </div>
          )}
          
          {popularSpecialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-mybakup-blue">{specialty.name}</span>
            </button>
          ))}

          {specialtySearch === '' && otherSpecialties.length > 0 && popularSpecialties.length > 0 && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
              Toutes les spécialités
            </div>
          )}

          {otherSpecialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-mybakup-blue">{specialty.name}</span>
            </button>
          ))}

          {filteredSpecialties.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Aucune spécialité trouvée
            </div>
          )}
        </div>
      )}

      {/* Dropdown for Languages */}
      {activeField === 'language' && (
        <div className="absolute z-10 w-1/2 right-0 mt-1 bg-white border border-gray-200 rounded-b-xl shadow-lg max-h-96 overflow-y-auto">
          {filteredLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="text-mybakup-blue">{language.name}</span>
            </button>
          ))}

          {filteredLanguages.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Aucune langue trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}