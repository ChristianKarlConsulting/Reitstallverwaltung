import { useState } from 'react';
import type { Payment, PaymentStatus } from '../types/payment';

// In einer echten App würde hier die Mollie API angebunden werden
const createMolliePayment = async (
  amount: number,
  description: string,
  method: string,
  metadata?: Record<string, string>
): Promise<Payment> => {
  // Simuliere API-Aufruf
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        amount,
        currency: 'EUR',
        description,
        status: 'pending',
        createdAt: new Date(),
        method,
        metadata,
      });
    }, 1000);
  });
};

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (
    amount: number,
    description: string,
    method: string,
    metadata?: Record<string, string>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const payment = await createMolliePayment(amount, description, method, metadata);
      
      // In einer echten App würde hier der Benutzer zur Mollie-Zahlungsseite weitergeleitet
      console.log('Weiterleitung zur Zahlung:', payment);
      
      return payment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Zahlungsinitiierung');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiatePayment,
    isLoading,
    error,
  };
};