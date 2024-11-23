import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import type { PaymentMethod } from '../../types/payment';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
  amount: number;
  description: string;
};

// Beispiel-Zahlungsmethoden - In einer echten App würden diese von Mollie abgerufen
const paymentMethods: PaymentMethod[] = [
  {
    id: 'ideal',
    name: 'iDEAL',
    description: 'Bezahlen Sie direkt mit Ihrem Online-Banking',
    image: 'https://www.mollie.com/external/icons/payment-methods/ideal.svg',
  },
  {
    id: 'creditcard',
    name: 'Kreditkarte',
    description: 'Zahlen Sie sicher mit Ihrer Kreditkarte',
    image: 'https://www.mollie.com/external/icons/payment-methods/creditcard.svg',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Bezahlen Sie einfach mit PayPal',
    image: 'https://www.mollie.com/external/icons/payment-methods/paypal.svg',
  },
  {
    id: 'sofort',
    name: 'SOFORT',
    description: 'Direkte Überweisung mit SOFORT',
    image: 'https://www.mollie.com/external/icons/payment-methods/sofort.svg',
  },
];

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  description,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod) {
      onConfirm(selectedMethod);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Zahlung</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">{description}</p>
          <p className="text-2xl font-bold mt-2">{amount.toFixed(2)} €</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <img
                      src={method.image}
                      alt={method.name}
                      className="h-8 w-8 object-contain"
                    />
                    <span className="ml-2 font-medium">{method.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {method.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!selectedMethod}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Jetzt bezahlen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;