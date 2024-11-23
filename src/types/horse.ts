export type Horse = {
  id: string;
  name: string;
  owner: string;
  birthDate: string;
  breed: string;
  color: string;
  boxNumber: string;
  ridingParticipants: RidingParticipant[];
  veterinarian: Contact;
  farrier: Contact;
  feedingPlan: FeedingPlan;
};

export type RidingParticipant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  schedule: string[];
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit?: string;
  nextVisit?: string;
};

export type FeedingPlan = {
  id: string;
  morning: string[];
  noon: string[];
  evening: string[];
  specialInstructions?: string;
};