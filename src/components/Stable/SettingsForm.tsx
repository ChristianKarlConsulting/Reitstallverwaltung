import React, { useState } from 'react';
import { Bell, Calendar, Lock } from 'lucide-react';
import type { StableSettings } from '../../types/stable';

type SettingsFormProps = {
  initialData: StableSettings;
  onSave: (data: StableSettings) => void;
};

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData, onSave }) => {
  const [settings, setSettings] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Benachrichtigungen
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="email-notifications"
              checked={settings.notifications.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    email: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="email-notifications"
              className="ml-3 text-sm text-gray-700"
            >
              E-Mail-Benachrichtigungen
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="push-notifications"
              checked={settings.notifications.push}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    push: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="push-notifications"
              className="ml-3 text-sm text-gray-700"
            >
              Push-Benachrichtigungen
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sms-notifications"
              checked={settings.notifications.sms}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    sms: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="sms-notifications"
              className="ml-3 text-sm text-gray-700"
            >
              SMS-Benachrichtigungen
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Buchungseinstellungen
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximale Vorlaufzeit für Buchungen (Tage)
            </label>
            <input
              type="number"
              value={settings.bookingSettings.maxAdvanceBookingDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bookingSettings: {
                    ...settings.bookingSettings,
                    maxAdvanceBookingDays: parseInt(e.target.value),
                  },
                })
              }
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mindestfrist für Stornierungen (Stunden)
            </label>
            <input
              type="number"
              value={settings.bookingSettings.minCancellationHours}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bookingSettings: {
                    ...settings.bookingSettings,
                    minCancellationHours: parseInt(e.target.value),
                  },
                })
              }
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-confirm"
              checked={settings.bookingSettings.autoConfirmBookings}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bookingSettings: {
                    ...settings.bookingSettings,
                    autoConfirmBookings: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="auto-confirm" className="ml-3 text-sm text-gray-700">
              Buchungen automatisch bestätigen
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Datenschutzeinstellungen
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-contact"
              checked={settings.privacySettings.showContactInfo}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  privacySettings: {
                    ...settings.privacySettings,
                    showContactInfo: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="show-contact" className="ml-3 text-sm text-gray-700">
              Kontaktinformationen öffentlich anzeigen
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-prices"
              checked={settings.privacySettings.showPrices}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  privacySettings: {
                    ...settings.privacySettings,
                    showPrices: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="show-prices" className="ml-3 text-sm text-gray-700">
              Preise öffentlich anzeigen
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-availability"
              checked={settings.privacySettings.showAvailability}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  privacySettings: {
                    ...settings.privacySettings,
                    showAvailability: e.target.checked,
                  },
                })
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="show-availability"
              className="ml-3 text-sm text-gray-700"
            >
              Verfügbarkeiten öffentlich anzeigen
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Einstellungen speichern
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;