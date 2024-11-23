import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import StableInfoForm from '../components/Stable/StableInfoForm';
import ServiceList from '../components/Stable/ServiceList';
import SettingsForm from '../components/Stable/SettingsForm';
import type { StableInfo, StableSettings } from '../types/stable';

// Beispieldaten
const mockStableInfo: StableInfo = {
  id: '1',
  name: 'Reiterhof Sonnenschein',
  address: 'Reitweg 1, 12345 Musterstadt',
  phone: '+49 123 456789',
  email: 'info@reiterhof-sonnenschein.de',
  website: 'www.reiterhof-sonnenschein.de',
  description: 'Familiärer Reiterhof mit langer Tradition und modernen Anlagen.',
  openingHours: {
    Montag: '07:00 - 20:00',
    Dienstag: '07:00 - 20:00',
    Mittwoch: '07:00 - 20:00',
    Donnerstag: '07:00 - 20:00',
    Freitag: '07:00 - 20:00',
    Samstag: '08:00 - 18:00',
    Sonntag: '08:00 - 18:00',
  },
  facilities: {
    boxes: 30,
    halls: 2,
    paddocks: 8,
    outdoorArenas: 2,
  },
  services: [
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
  ],
  rules: [
    'Reithelmpflicht auf der gesamten Anlage',
    'Hunde nur angeleint',
    'Parkplätze nur auf gekennzeichneten Flächen',
  ],
};

const mockSettings: StableSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  bookingSettings: {
    maxAdvanceBookingDays: 30,
    minCancellationHours: 24,
    autoConfirmBookings: false,
  },
  privacySettings: {
    showContactInfo: true,
    showPrices: true,
    showAvailability: true,
  },
};

const MeinStall = () => {
  const [stableInfo, setStableInfo] = useState<StableInfo>(mockStableInfo);
  const [settings, setSettings] = useState<StableSettings>(mockSettings);

  const handleInfoSave = (data: StableInfo) => {
    setStableInfo(data);
    // Hier würde normalerweise ein API-Call erfolgen
    console.log('Stalldaten gespeichert:', data);
  };

  const handleServiceUpdate = (services: StableInfo['services']) => {
    setStableInfo({ ...stableInfo, services });
    // Hier würde normalerweise ein API-Call erfolgen
    console.log('Services aktualisiert:', services);
  };

  const handleSettingsSave = (data: StableSettings) => {
    setSettings(data);
    // Hier würde normalerweise ein API-Call erfolgen
    console.log('Einstellungen gespeichert:', data);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Mein Stall</h1>
        <p className="mt-2 text-gray-600">
          Verwalten Sie Ihre Stallinformationen und Einstellungen
        </p>
      </header>

      <div className="bg-white rounded-lg shadow">
        <Tabs defaultValue="info" className="p-6">
          <TabsList className="mb-6">
            <TabsTrigger value="info">Allgemeine Informationen</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <StableInfoForm
              initialData={stableInfo}
              onSave={handleInfoSave}
            />
          </TabsContent>

          <TabsContent value="services">
            <ServiceList
              services={stableInfo.services}
              onUpdate={handleServiceUpdate}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsForm
              initialData={settings}
              onSave={handleSettingsSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MeinStall;