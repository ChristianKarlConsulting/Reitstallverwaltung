import React, { useState } from 'react';
import { Building2, Phone, Mail, Globe, Clock, Horse } from 'lucide-react';
import type { StableInfo } from '../../types/stable';

type StableInfoFormProps = {
  initialData: StableInfo;
  onSave: (data: StableInfo) => void;
};

const StableInfoForm: React.FC<StableInfoFormProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-Mail</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Öffnungszeiten</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.openingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center space-x-4">
              <span className="w-24 text-gray-700">{day}</span>
              <input
                type="text"
                value={hours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    openingHours: {
                      ...formData.openingHours,
                      [day]: e.target.value,
                    },
                  })
                }
                className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="z.B. 07:00 - 20:00"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Anlagen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Boxen</label>
            <input
              type="number"
              value={formData.facilities.boxes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    boxes: parseInt(e.target.value),
                  },
                })
              }
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reithallen</label>
            <input
              type="number"
              value={formData.facilities.halls}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    halls: parseInt(e.target.value),
                  },
                })
              }
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Paddocks</label>
            <input
              type="number"
              value={formData.facilities.paddocks}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    paddocks: parseInt(e.target.value),
                  },
                })
              }
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Außenplätze</label>
            <input
              type="number"
              value={formData.facilities.outdoorArenas}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facilities: {
                    ...formData.facilities,
                    outdoorArenas: parseInt(e.target.value),
                  },
                })
              }
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Änderungen speichern
        </button>
      </div>
    </form>
  );
};

export default StableInfoForm;