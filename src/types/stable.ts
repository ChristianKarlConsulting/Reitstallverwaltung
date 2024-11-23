export type StableInfo = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  openingHours: {
    [key: string]: string;
  };
  facilities: {
    boxes: number;
    halls: number;
    paddocks: number;
    outdoorArenas: number;
  };
  services: {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
  }[];
  rules?: string[];
};

export type StableSettings = {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  bookingSettings: {
    maxAdvanceBookingDays: number;
    minCancellationHours: number;
    autoConfirmBookings: boolean;
  };
  privacySettings: {
    showContactInfo: boolean;
    showPrices: boolean;
    showAvailability: boolean;
  };
};