export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'canceled'
  | 'expired';

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentStatus;
  createdAt: Date;
  method?: string;
  metadata?: {
    orderId?: string;
    serviceId?: string;
    userId?: string;
  };
};