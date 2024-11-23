export type HealthRecord = {
  id: string;
  horseId: string;
  horseName: string;
  type: 'impfung' | 'behandlung' | 'untersuchung' | 'medikation' | 'wurmkur';
  date: Date;
  nextDate?: Date;
  veterinarian: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes?: string;
  documents?: HealthDocument[];
  status: 'geplant' | 'abgeschlossen' | 'überfällig';
};

export type HealthDocument = {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadDate: Date;
};

export type VaccinationSchedule = {
  id: string;
  horseId: string;
  vaccinationType: string;
  lastDate: Date;
  nextDate: Date;
  interval: number; // in months
  status: 'aktuell' | 'fällig' | 'überfällig';
};