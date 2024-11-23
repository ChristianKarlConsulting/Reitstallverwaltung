export type Rider = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  horses: RiderHorse[];
  memberSince: Date;
  status: 'aktiv' | 'inaktiv';
  notes?: string;
};

export type RiderHorse = {
  horseId: string;
  horseName: string;
  role: 'besitzer' | 'reitbeteiligung';
  schedule?: string[];
};