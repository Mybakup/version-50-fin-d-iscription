import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DoctorSearch from './pages/DoctorSearch';
import VoiceCommand from './pages/VoiceCommand';
import AppointmentScheduling from './pages/AppointmentScheduling';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import Appointments from './pages/Appointments';
import AppointmentDetails from './components/AppointmentDetails';
import Profile from './pages/Profile';
import TravelGuide from './pages/TravelGuide';
import CarrefourVoyages from './pages/CarrefourVoyages';
import OnboardingTutorial from './components/OnboardingTutorial';
import ProfileChoice from './pages/ProfileChoice';
import PractitionerTypeChoice from './pages/PractitionerTypeChoice';
import PractitionerSignup from './pages/PractitionerSignup';
import PractitionerInfo from './pages/PractitionerInfo';
import ProfessionalDetails from './pages/ProfessionalDetails';

export default function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      setShowTutorial(false);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  return (
    <div className="h-screen overflow-x-hidden">
      {showTutorial && <OnboardingTutorial onComplete={handleTutorialComplete} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<DoctorSearch />} />
        <Route path="/voice-command" element={<VoiceCommand />} />
        <Route path="/appointment" element={<AppointmentScheduling />} />
        <Route path="/appointment/confirmation" element={<AppointmentConfirmation />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-choice" element={<ProfileChoice />} />
        <Route path="/practitioner-type" element={<PractitionerTypeChoice />} />
        <Route path="/practitioner-signup" element={<PractitionerSignup />} />
        <Route path="/practitioner-info" element={<PractitionerInfo />} />
        <Route path="/professional-details" element={<ProfessionalDetails />} />
        <Route path="/travel-guide" element={<TravelGuide />} />
        <Route path="/partner/carrefour-voyages" element={<CarrefourVoyages />} />
        <Route 
          path="/appointments/:id" 
          element={<AppointmentDetails appointment={{
            id: '1',
            date: '2 juin 2023',
            time: '09:30',
            doctor: {
              name: 'Dr Virginie USOLINI',
              specialty: 'Laboratoire',
              imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
            },
            patient: {
              name: 'Julien Bakala',
              gender: 'Homme',
              age: 38,
              phone: '+33650439664'
            },
            location: {
              type: 'Cabinet',
              address: 'Sydney, New South Wales',
              city: 'Sydney',
              country: 'AUS',
              phone: '+33675990550'
            },
            price: 40.00
          }} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}