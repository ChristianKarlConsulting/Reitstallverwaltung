export type Instructor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  description?: string;
  imageUrl?: string;
};

export type Availability = {
  id: string;
  instructorId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  maxStudents: number;
  currentStudents: number;
  type: 'einzelstunde' | 'gruppenstunde';
  level: 'anfänger' | 'fortgeschritten' | 'alle';
};

export type LessonBooking = {
  id: string;
  availabilityId: string;
  instructorId: string;
  studentId: string;
  studentName: string;
  date: Date;
  status: 'bestätigt' | 'warteliste' | 'storniert';
  createdAt: Date;
  notes?: string;
};