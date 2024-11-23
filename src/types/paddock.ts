export type PaddockStatus = {
  isOpen: boolean;
  lastUpdated: Date;
  weather: string;
  notes: string;
};

export type HorsePaddockException = {
  horseId: string;
  horseName: string;
  reason: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};