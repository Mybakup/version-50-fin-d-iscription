import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: {
    name: string;
    specialty: string;
    imageUrl: string;
  };
  patient: {
    name: string;
    gender: string;
    age: number;
    phone: string;
  };
  location: {
    type: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  price: number;
}

const mockAppointments: Appointment[] = [
  {
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
  },
  {
    id: '2',
    date: '2 juin 2023',
    time: '14:30',
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
  }
];

export default function Appointments() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus>('confirmed');

  const statusTabs = [
    { status: 'pending' as const, label: 'En attente', count: 0 },
    { status: 'confirmed' as const, label: 'Confirmés', count: 3 },
    { status: 'cancelled' as const, label: 'Annulés', count: 10 }
  ];

  // Fonction pour déterminer si un rendez-vous est passé
  const isAppointmentPast = (date: string, time: string) => {
    const [day, month, year] = date.split(' ');
    const [hours, minutes] = time.split(':');
    const appointmentDate = new Date(
      parseInt(year),
      ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'].indexOf(month.toLowerCase()),
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    return appointmentDate < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-[#47559E]" />
            </button>
            <img 
              src="https://i.imgur.com/jxMQcJi.png" 
              alt="MyBakup" 
              className="h-8"
            />
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-[#47559E] text-center mb-6">
          Rendez-vous
        </h1>

        {/* Status Tabs */}
        <div className="flex justify-between mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setActiveStatus(tab.status)}
              className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                activeStatus === tab.status
                  ? 'border-[#47559E] text-[#47559E]'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {mockAppointments.map((appointment) => {
            const isPast = isAppointmentPast(appointment.date, appointment.time);
            return (
              <div 
                key={appointment.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all
                  ${isPast ? 'border border-gray-200' : 'border border-[#47559E]/20'}
                  hover:border-[#47559E]/40 hover:shadow-md`}
                onClick={() => navigate(`/appointments/${appointment.id}`, { state: { appointment } })}
              >
                {/* Date and Time Header */}
                <div className={`px-4 py-3 flex items-center justify-center gap-6
                  ${isPast ? 'bg-gray-50' : 'bg-[#FFF8F8]'}`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#47559E]" />
                    <span className="text-[#47559E] font-medium">{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#47559E]" />
                    <span className="text-[#47559E] font-medium">{appointment.time}</span>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={appointment.doctor.imageUrl}
                      alt={appointment.doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#47559E]">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-gray-600">{appointment.doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="text-[#47559E]">{appointment.patient.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-[#47559E]">{appointment.location.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}