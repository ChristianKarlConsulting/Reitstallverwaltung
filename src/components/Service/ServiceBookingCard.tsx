import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import type { StableInfo } from '../../types/stable';
import PaymentModal from '../Payment/PaymentModal';
import { usePayment } from '../../hooks/usePayment';

type ServiceBookingCardProps = {
  service: StableInfo['services'][0];
};

const ServiceBookingCard: React.FC<ServiceBookingCardProps> = ({ service }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { initiatePayment, isLoading, error } = usePayment();

  const handlePayment = async (paymentMethod: string) => {
    const payment = await initiatePayment(
      service.price,
      `Buchung: ${service.name}`,
      paymentMethod,
      {
        serviceId: service.id,
      }
    );

    if (payment) {
      setIsPaymentModalOpen(false);
      // In einer echten App würde hier die Weiterleitung zur Mollie-Zahlungsseite erfolgen
      alert('Weiterleitung zur Zahlungsseite...');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
          <p className="text-gray-600 mt-1">{service.description}</p>
        </div>
        <span className="text-2xl font-bold text-gray-900">
          {service.price.toFixed(2)} € <span className="text-sm">/ {service.unit}</span>
        </span>
      </div>

      <button
        onClick={() => setIsPaymentModalOpen(true)}
        disabled={isLoading}
        className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        {isLoading ? 'Wird verarbeitet...' : 'Jetzt buchen'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePayment}
        amount={service.price}
        description={`Buchung: ${service.name}`}
      />
    </div>
  );
};

export default ServiceBookingCard;