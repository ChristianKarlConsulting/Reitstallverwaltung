import React from 'react';
import ServiceBookingCard from '../components/Service/ServiceBookingCard';
import type { StableInfo } from '../types/stable';

// Beispieldaten
const mockServices: StableInfo['services'] = [
  {
    id: '1',
    name: 'Vollpension',
    description: 'Komplette Versorgung inkl. Fütterung und Ausmisten',
    price: 750,
    unit: 'Monat',
  },
  {
    id: '2',
    name: 'Reitstunde',
    description: 'Einzelunterricht mit erfahrenem Trainer',
    price: 45,
    unit: 'Stunde',
  },
  {
    id: '3',
    name: 'Longenstunde',
    description: 'Einzelunterricht an der Longe',
    price: 35,
    unit: 'Stunde',
  },
];

const Services = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Services buchen</h1>
        <p className="mt-2 text-gray-600">
          Wählen Sie aus unseren Angeboten und buchen Sie direkt online
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices.map((service) => (
          <ServiceBookingCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;