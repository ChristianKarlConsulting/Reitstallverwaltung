import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { HorsePaddockException } from '../../types/paddock';

type ExceptionListProps = {
  exceptions: HorsePaddockException[];
  onDelete: (id: string) => void;
};

const ExceptionList: React.FC<ExceptionListProps> = ({ exceptions, onDelete }) => {
  const activeExceptions = exceptions.filter((e) => e.isActive);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Aktive Ausnahmen</h3>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
          {activeExceptions.length} aktiv
        </span>
      </div>

      <div className="space-y-4">
        {activeExceptions.map((exception) => (
          <div
            key={`${exception.horseId}-${exception.startDate.getTime()}`}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{exception.horseName}</p>
              <p className="text-sm text-gray-600">{exception.reason}</p>
              <p className="text-sm text-gray-500">
                {format(exception.startDate, 'dd.MM.yyyy', { locale: de })} -{' '}
                {format(exception.endDate, 'dd.MM.yyyy', { locale: de })}
              </p>
            </div>
            <button
              onClick={() => onDelete(exception.horseId)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ))}

        {activeExceptions.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Keine aktiven Ausnahmen vorhanden
          </p>
        )}
      </div>
    </div>
  );
};

export default ExceptionList;