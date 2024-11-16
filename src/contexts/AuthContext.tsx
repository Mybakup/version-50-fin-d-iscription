import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Beneficiary {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  phone: string;
  relationship?: string;
}

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  beneficiaries: Beneficiary[];
  setUser: (user: User | null) => void;
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
  removeBeneficiary: (id: string) => void;
  updateBeneficiary: (id: string, data: Partial<Beneficiary>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('mybakup_user');
    const savedBeneficiaries = localStorage.getItem('mybakup_beneficiaries');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedBeneficiaries) {
      setBeneficiaries(JSON.parse(savedBeneficiaries));
    }
  }, []);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('mybakup_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('mybakup_user');
    }
  };

  const addBeneficiary = (beneficiary: Omit<Beneficiary, 'id'>) => {
    const newBeneficiary = {
      ...beneficiary,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedBeneficiaries = [...beneficiaries, newBeneficiary];
    setBeneficiaries(updatedBeneficiaries);
    localStorage.setItem('mybakup_beneficiaries', JSON.stringify(updatedBeneficiaries));
  };

  const removeBeneficiary = (id: string) => {
    const updatedBeneficiaries = beneficiaries.filter(b => b.id !== id);
    setBeneficiaries(updatedBeneficiaries);
    localStorage.setItem('mybakup_beneficiaries', JSON.stringify(updatedBeneficiaries));
  };

  const updateBeneficiary = (id: string, data: Partial<Beneficiary>) => {
    const updatedBeneficiaries = beneficiaries.map(b => 
      b.id === id ? { ...b, ...data } : b
    );
    setBeneficiaries(updatedBeneficiaries);
    localStorage.setItem('mybakup_beneficiaries', JSON.stringify(updatedBeneficiaries));
  };

  const logout = () => {
    setUser(null);
    setBeneficiaries([]);
    localStorage.removeItem('mybakup_user');
    localStorage.removeItem('mybakup_beneficiaries');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        beneficiaries,
        setUser: handleSetUser,
        addBeneficiary,
        removeBeneficiary,
        updateBeneficiary,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}