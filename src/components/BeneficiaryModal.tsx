import React, { useState } from 'react';
import { X, Loader2, Plus, User, Pencil, Trash2, Check } from 'lucide-react';
import { useAuth, Beneficiary } from '../contexts/AuthContext';

interface BeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (beneficiary: Beneficiary) => void;
}

type Mode = 'list' | 'add' | 'edit';

export default function BeneficiaryModal({ isOpen, onClose, onSelect }: BeneficiaryModalProps) {
  const { beneficiaries, addBeneficiary, removeBeneficiary, updateBeneficiary } = useAuth();
  const [mode, setMode] = useState<Mode>('list');
  const [loading, setLoading] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'other' as const,
    age: '',
    phone: '',
    relationship: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'add') {
        const newBeneficiary = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          age: parseInt(formData.age),
          phone: formData.phone,
          relationship: formData.relationship
        };
        addBeneficiary(newBeneficiary);
      } else if (mode === 'edit' && selectedBeneficiary) {
        updateBeneficiary(selectedBeneficiary.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          age: parseInt(formData.age),
          phone: formData.phone,
          relationship: formData.relationship
        });
      }
      resetForm();
      setMode('list');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setFormData({
      firstName: beneficiary.firstName,
      lastName: beneficiary.lastName,
      gender: beneficiary.gender,
      age: beneficiary.age.toString(),
      phone: beneficiary.phone,
      relationship: beneficiary.relationship || ''
    });
    setMode('edit');
  };

  const handleDelete = (beneficiary: Beneficiary) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      removeBeneficiary(beneficiary.id);
    }
  };

  const handleSelectBeneficiary = (beneficiary: Beneficiary) => {
    if (onSelect) {
      onSelect(beneficiary);
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: 'other',
      age: '',
      phone: '',
      relationship: ''
    });
    setSelectedBeneficiary(null);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prénom
        </label>
        <input
          type="text"
          required
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom
        </label>
        <input
          type="text"
          required
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            gender: e.target.value as 'male' | 'female' | 'other' 
          }))}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        >
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Âge
        </label>
        <input
          type="number"
          required
          min="0"
          max="120"
          value={formData.age}
          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lien de parenté
        </label>
        <input
          type="text"
          value={formData.relationship}
          onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
          placeholder="Ex: Conjoint, Enfant, Parent..."
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => {
            resetForm();
            setMode('list');
          }}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-mybakup-coral text-white rounded-xl hover:bg-opacity-90 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : mode === 'edit' ? (
            'Modifier'
          ) : (
            'Ajouter'
          )}
        </button>
      </div>
    </form>
  );

  const renderList = () => (
    <div className="space-y-4">
      {beneficiaries.map((beneficiary) => (
        <div
          key={beneficiary.id}
          className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-mybakup-coral transition-colors group"
        >
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => handleSelectBeneficiary(beneficiary)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {beneficiary.firstName} {beneficiary.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {beneficiary.age} ans • {beneficiary.relationship}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectBeneficiary(beneficiary)}
              className="p-2 text-mybakup-coral hover:bg-mybakup-coral/10 rounded-full transition-colors"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(beneficiary)}
              className="p-2 text-gray-500 hover:text-mybakup-coral rounded-full hover:bg-gray-100"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(beneficiary)}
              className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          resetForm();
          setMode('add');
        }}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-mybakup-coral text-gray-500 hover:text-mybakup-coral transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter un bénéficiaire</span>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-mybakup-blue">
              {mode === 'add' ? 'Ajouter un bénéficiaire' : 
               mode === 'edit' ? 'Modifier le bénéficiaire' : 
               'Sélectionner un bénéficiaire'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {mode === 'list' ? renderList() : renderForm()}
        </div>
      </div>
    </div>
  );
}