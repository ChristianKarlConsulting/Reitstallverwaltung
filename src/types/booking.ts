export type Facility = {
  id: string;
  name: string;
  type: 'reithalle' | 'longierhalle' | 'aussenplatz';
};

export type Booking = {
  id: string;
  facilityId: string;
  userId: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  title: string;
  description?: string;
};