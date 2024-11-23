import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Activity, 
  Calendar, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { HealthRecord } from '../../types/health';

type HealthRecordCardProps = {
  record: HealthRecord;
  onClick: (record: HealthRecord) => void;
};

const typeIcons = {
  impfung: Activity,
  behandlung: AlertCircle,
  untersuchung: Activity,
  medikation: Activity,
  wurmkur: Activity,
};

const statusColors = {
  geplant: 'bg-blue-100 text-blue-800',
  abgeschlossen: 'bg-green-100 text-green-800',
  überfällig: 'bg-red-100 text-red-800',
};

const HealthRecordCard: React.FC<HealthRecordCardProps> = ({ record, onClick }) => {
  const Icon = typeIcons[record.type];

  return (
    <div
      onClick={() => onClick(record)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
            </h3>
            <p className="text-sm text-gray-600">{record.horseName}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[record.status]}`}>
          {record.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{format(record.date, 'dd. MMMM yyyy', { locale: de })}</span>
        </div>

        {record.nextDate && (
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Nächster Termin: {format(record.nextDate, 'dd. MMMM yyyy', { locale: de })}</span>
          </div>
        )}

        <div className="flex items-center text-gray-600">
          <FileText className="h-4 w-4 mr-2" />
          <span>{record.documents?.length || 0} Dokumente</span>
        </div>

        {record.diagnosis && (
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Diagnose:</span> {record.diagnosis}
          </p>
        )}
      </div>
    </div>
  );
};

export default HealthRecordCard;