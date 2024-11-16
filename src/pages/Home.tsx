import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Pill, 
  Video, 
  Mic, 
  FileText,
  MapPin,
  Briefcase,
  Bot,
  Calendar,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  X
} from 'lucide-react';
import QuickSignupModal from '../components/QuickSignupModal';
import SocialLinks from '../components/SocialLinks';
import { useAuth } from '../contexts/AuthContext';
import CarrefourVoyages from './CarrefourVoyages';
import DoctorProfile from '../components/DoctorProfile';

const slides = [
  {
    id: 1,
    title: "Carrefour Voyages",
    description: "Votre partenaire voyage de confiance",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Partenaire",
    logo: "https://i.imgur.com/YwXqXR3.png",
    isPartner: true,
    path: '/partner/carrefour-voyages'
  },
  {
    id: 2,
    title: "Voyagez l'esprit tranquille",
    description: "Des solutions adaptées pour votre santé à l'étranger",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Sérénité"
  },
  {
    id: 3,
    title: "Votre bien-être avant tout",
    description: "Accédez aux meilleurs soins où que vous soyez",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Bien-être"
  },
  {
    id: 4,
    title: "Conseils nutritionnels",
    description: "Mangez sainement pendant vos voyages",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=400",
    tag: "Nutrition"
  }
];

const mainActions = [
  {
    icon: MapPin,
    title: 'Voir les praticiens',
    description: 'Trouvez un médecin près de chez vous',
    path: '/search',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Calendar,
    title: 'Mes rendez-vous',
    description: 'Consultez et gérez vos rendez-vous',
    path: '/appointments',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  }
];

const services = [
  {
    icon: Video,
    title: 'Téléconsultation',
    description: 'Consultez un médecin en ligne',
    path: '/teleconsult',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  },
  {
    icon: Mic,
    title: 'Commande vocale',
    description: 'Utilisez votre voix pour naviguer',
    path: '/voice-command',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Pill,
    title: 'Traducteur de médicaments',
    description: 'Trouvez les équivalents de vos médicaments',
    path: '/translator',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  },
  {
    icon: FileText,
    title: 'Fiche pratique',
    description: 'Informations par destination',
    path: '/travel-guide',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  },
  {
    icon: Briefcase,
    title: 'Préparer mon voyage',
    description: 'Trousse à pharmacie personnalisée',
    path: '/travel-prep',
    color: 'bg-[#EDF5FF]',
    textColor: 'text-[#424e6f]'
  },
  {
    icon: Bot,
    title: 'Assistant médical',
    description: 'Votre aide personnelle',
    path: '/assistant',
    color: 'bg-[#FFE8E8]',
    textColor: 'text-[#ff3c00]'
  }
];

const nextAppointment = {
  id: '1',
  doctor: {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Généraliste',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    languages: ['English', 'Mandarin', 'French'],
    address: '123 Medical Center, Paris',
    availability: ['Tomorrow at 10:00', 'Thursday at 14:00'],
    rating: 4.8,
    distance: '1.2 km',
    phone: '+33 1 23 45 67 89',
    consultationPrice: 60,
    medicalActs: [
      { name: 'General Consultation', price: 60 },
      { name: 'Annual Check-up', price: 120 },
      { name: 'Vaccination', price: 40 }
    ],
    paymentMethods: ['Credit Card', 'Cash', 'Health Insurance Card'],
    openingHours: [
      { day: 'Monday', hours: '9:00 - 17:00' },
      { day: 'Tuesday', hours: '9:00 - 17:00' },
      { day: 'Wednesday', hours: '9:00 - 12:00' },
      { day: 'Thursday', hours: '9:00 - 17:00' },
      { day: 'Friday', hours: '9:00 - 16:00' }
    ],
    education: [
      'MD from Paris Descartes University, 2010',
      'Residency in Family Medicine, Hôpital Saint-Louis, 2013'
    ],
    experience: [
      '10+ years in Family Medicine',
      'Former Chief Resident at Hôpital Saint-Louis'
    ],
    insurance: ['CPAM', 'MGEN', 'Harmonie Mutuelle'],
    officePictures: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'
    ],
    qualifications: ['Board Certified', 'Family Medicine']
  },
  date: '2 avril 2024',
  time: '14:30',
  type: 'Cabinet'
};

const pastAppointments = [
  {
    id: '2',
    date: '2 juin 2023',
    time: '09:30',
    doctor: {
      name: 'Dr Virginie USOLINI',
      specialty: 'Laboratoire',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
    },
    type: 'Cabinet'
  },
  {
    id: '3',
    date: '28 décembre 2023',
    time: '09:00',
    doctor: {
      name: 'Dr Romain OLEKHNOVITCH',
      specialty: 'Médecin généraliste',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    type: 'Cabinet'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCarrefourModal, setShowCarrefourModal] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);

  const handleActionClick = (path: string) => {
    if (!isAuthenticated) {
      setShowSignupModal(true);
    } else {
      navigate(path);
    }
  };

  const handleSlideClick = (slide: typeof slides[0]) => {
    if (slide.isPartner) {
      setShowCarrefourModal(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img 
            src="https://i.imgur.com/jxMQcJi.png" 
            alt="MyBakup" 
            className="h-8"
          />
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <UserCircle className="w-6 h-6 text-[#424e6f]" />
          </button>
        </div>
      </header>

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <section className="mb-8">
            <SocialLinks />
          </section>

          {/* Main Actions */}
          <section className="grid grid-cols-2 gap-4 mb-8">
            {mainActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleActionClick(action.path)}
                className="h-[140px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group flex flex-col justify-between"
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#424e6f] mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{action.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Slider Section */}
          <section className="mb-8 relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`flex-shrink-0 w-[85%] sm:w-[500px] rounded-2xl overflow-hidden transition-transform duration-500 relative group cursor-pointer snap-start ${
                    slide.path ? 'hover:opacity-90' : ''
                  }`}
                  onClick={() => handleSlideClick(slide)}
                >
                  <div className="relative h-[200px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      {slide.isPartner && (
                        <img
                          src={slide.logo}
                          alt="Carrefour Voyages"
                          className="h-8 mb-3"
                        />
                      )}
                      <span className="inline-block px-3 py-1 bg-[#ff3c00] text-white text-sm rounded-full mb-2">
                        {slide.tag}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20 transition-transform group-hover:translate-x-0 translate-x-[-100%]"
            >
              <ChevronLeft className="w-5 h-5 text-[#424e6f]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg z-20 transition-transform group-hover:translate-x-0 translate-x-[100%]"
            >
              <ChevronRight className="w-5 h-5 text-[#424e6f]" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-[#ff3c00] w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">Mes services</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleActionClick(service.path)}
                  className="flex-shrink-0 w-[240px] bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className={`p-3 rounded-xl ${service.color} mb-3`}>
                    <service.icon className={`w-6 h-6 ${service.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-[#424e6f] mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-[#FFE8E8] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#ff3c00] mb-4">Mon prochain rendez-vous</h2>
              <div 
                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => setShowDoctorProfile(true)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={nextAppointment.doctor.imageUrl}
                    alt={nextAppointment.doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#424e6f]">
                      {nextAppointment.doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {nextAppointment.doctor.specialty}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{nextAppointment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{nextAppointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{nextAppointment.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Past Appointments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#424e6f] mb-4">Historique des rendez-vous</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  onClick={() => navigate(`/appointments/${appointment.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={appointment.doctor.imageUrl}
                      alt={appointment.doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#424e6f]">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.doctor.specialty}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <QuickSignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />

      {/* Carrefour Voyages Modal */}
      {showCarrefourModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center overflow-y-auto">
          <div className="relative w-full max-w-3xl mx-auto my-8">
            <button
              onClick={() => setShowCarrefourModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <CarrefourVoyages />
          </div>
        </div>
      )}

      {showDoctorProfile && (
        <DoctorProfile 
          doctor={nextAppointment.doctor} 
          onClose={() => setShowDoctorProfile(false)} 
        />
      )}
    </div>
  );
}