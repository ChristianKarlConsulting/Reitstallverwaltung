import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import type { StableInfo } from '../../types/stable';

type ServiceListProps = {
  services: StableInfo['services'];
  onUpdate: (services: StableInfo['services']) => void;
};

const ServiceList: React.FC<ServiceListProps> = ({ services, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<StableInfo['services'][0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    unit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      onUpdate(
        services.map((service) =>
          service.id === editingService.id
            ? { ...service, ...formData }
            : service
        )
      );
    } else {
      onUpdate([
        ...services,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
        },
      ]);
    }
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({ name: '', description: '', price: 0, unit: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Möchten Sie diesen Service wirklich löschen?')) {
      onUpdate(services.filter((service) => service.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Services</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
        >
          <Plus className="h-4 w-4 mr-1" />
          Service hinzufügen
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-gray-900">{service.name}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {service.price.toFixed(2)} € / {service.unit}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingService(service);
                  setFormData({
                    name: service.name,
                    description: service.description,
                    price: service.price,
                    unit: service.unit,
                  });
                  setIsModalOpen(true);
                }}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Keine Services vorhanden
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingService ? 'Service bearbeiten' : 'Neuer Service'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingService(null);
                  setFormData({ name: '', description: '', price: 0, unit: '' });
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Beschreibung
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preis (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Einheit
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="z.B. Monat, Stunde"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: 0,
                      unit: '',
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingService ? 'Speichern' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;