import React from 'react';
import { format, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';
import type { VaccinationSchedule as VaccinationScheduleType } from '../../types/health';

type VaccinationScheduleProps = {
  schedules: VaccinationScheduleType[];
};

const statusColors = {
  aktuell: 'bg-green-100 text-green-800',
  fällig: 'bg-yellow-100 text-yellow-800',
  überfällig: 'bg-red-100 text-red-800',
};

const statusIcons = {
  aktuell: CheckCircle,
  fällig: AlertCircle,
  überfällig: AlertCircle,
};

const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({ schedules }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Impfplan</h2>
      <div className="space-y-4">
        {schedules.map((schedule) => {
          const StatusIcon = statusIcons[schedule.status];
          
          return (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Activity className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{schedule.vaccinationType}</h3>
                  <p className="text-sm text-gray-600">
                    Letzte Impfung: {format(schedule.lastDate, 'dd. MMMM yyyy', { locale: de })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[schedule.status]}`}>
                  <StatusIcon className="h-4 w-4 mr-1" />
                  {schedule.status}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Nächste Impfung: {format(schedule.nextDate, 'dd. MMMM yyyy', { locale: de })}
                </p>
              </div>
            </div>
          );
        })}

        {schedules.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Keine Impfungen geplant
          </p>
        )}
      </div>
    </div>
  );
};

export default VaccinationSchedule;