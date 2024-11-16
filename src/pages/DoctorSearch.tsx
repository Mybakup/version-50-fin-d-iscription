import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mic, ArrowLeft, Star, Navigation2 } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { mockDoctors } from '../data/mockDoctors';
import type { Doctor } from '../types';
import DoctorProfile from '../components/DoctorProfile';
import SpecialtyLanguageSearch from '../components/SpecialtyLanguageSearch';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Default coordinates for Sydney CBD
const DEFAULT_COORDINATES = {
  latitude: -33.8688,
  longitude: 151.2093
};

export default function DoctorSearch() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates>(DEFAULT_COORDINATES);
  const [isLocating, setIsLocating] = useState(true);
  
  const { startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: (text) => {
      console.log('Voice result:', text);
    },
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, []);

  const handleSpecialtySelect = (specialty: any) => {
    console.log('Selected specialty:', specialty);
  };

  const handleLanguageSelect = (language: string) => {
    console.log('Selected language:', language);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Map Container */}
      <div className="flex-1 relative">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.longitude - 0.02}%2C${userLocation.latitude - 0.02}%2C${userLocation.longitude + 0.02}%2C${userLocation.latitude + 0.02}&layer=mapnik&marker=${userLocation.latitude}%2C${userLocation.longitude}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Sydney Map"
        />

        {/* User Location Marker */}
        {!isLocating && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <div className="relative">
              <div className="w-4 h-4 bg-mybakup-blue rounded-full border-2 border-white shadow-lg" />
              <div className="absolute -inset-2 bg-mybakup-blue opacity-20 rounded-full animate-ping" />
            </div>
          </div>
        )}

        {/* Search Filters */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="flex w-full">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden flex shadow-lg">
                <SpecialtyLanguageSearch 
                  onSpecialtySelect={handleSpecialtySelect}
                  onLanguageSelect={handleLanguageSelect}
                />
              </div>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Adresse"
                className="w-full h-12 pl-10 pr-24 bg-white border border-gray-200 rounded-xl text-mybakup-blue focus:outline-none focus:border-mybakup-coral shadow-lg"
              />
              <MapPin className="absolute left-3 w-5 h-5 text-gray-400" />
              <div className="absolute right-3 flex items-center gap-2">
                <button
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <Navigation2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/voice-command')}
                  disabled={!isSupported}
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div 
        className={`bg-white rounded-t-[2rem] shadow-lg transition-all duration-300 ease-in-out ${
          isListExpanded ? 'h-[70vh]' : 'h-auto'
        }`}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">Médecins à proximité</h2>
            <button 
              onClick={() => setIsListExpanded(!isListExpanded)}
              className="text-mybakup-coral hover:text-mybakup-coral/80 transition-colors px-4 py-2 bg-red-50 rounded-full"
            >
              {isListExpanded ? 'Voir carte' : 'Voir liste'}
            </button>
          </div>

          {isListExpanded ? (
            // Liste verticale
            <div className="space-y-4 overflow-y-auto max-h-[calc(70vh-8rem)]">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                    selectedDoctor?.id === doctor.id 
                      ? 'border-2 border-mybakup-coral' 
                      : 'border border-gray-100 hover:border-mybakup-coral'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-mybakup-coral">{doctor.distance}</span>
                        </div>
                        <h3 className="font-semibold text-mybakup-blue mt-1">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className="text-sm text-mybakup-coral font-medium">€{doctor.consultationPrice}</span>
                            <span className="text-xs text-gray-500 ml-1">/ consultation</span>
                          </div>
                          <button 
                            className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                          >
                            Réserver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Slider horizontal
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
              {mockDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                    selectedDoctor?.id === doctor.id 
                      ? 'border-2 border-mybakup-coral shadow-md' 
                      : 'border border-gray-100 hover:border-mybakup-coral'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-mybakup-coral fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                          <span className="text-xs font-medium text-mybakup-coral">{doctor.distance}</span>
                        </div>
                        <h3 className="font-semibold text-mybakup-blue mt-1">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm text-mybakup-coral font-medium">€{doctor.consultationPrice}</span>
                        <span className="text-xs text-gray-500 ml-1">/ consultation</span>
                      </div>
                      <button 
                        onClick={() => setSelectedDoctor(doctor)}
                        className="px-4 py-2 bg-mybakup-coral text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfile 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  );
}