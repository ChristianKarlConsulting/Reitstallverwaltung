import React from 'react';
import { Calendar, Horse, Users, Bell } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Willkommen im ReitStall Manager</h1>
        <p className="mt-2 text-gray-600">Ihr digitaler Assistent für die Stallverwaltung</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={Horse}
          title="Pferde"
          value="24"
          description="Aktive Pferde"
          color="bg-blue-500"
        />
        <DashboardCard
          icon={Users}
          title="Reiter"
          value="32"
          description="Registrierte Reiter"
          color="bg-green-500"
        />
        <DashboardCard
          icon={Calendar}
          title="Termine"
          value="8"
          description="Heute anstehend"
          color="bg-purple-500"
        />
        <DashboardCard
          icon={Bell}
          title="Neuigkeiten"
          value="3"
          description="Neue Mitteilungen"
          color="bg-orange-500"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Aktuelle Termine</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Hufschmied</p>
                <p className="text-sm text-gray-600">Heute, 14:00 Uhr</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Neueste Mitteilungen</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Neue Koppelzeiten</p>
              <p className="text-sm text-gray-600">Ab nächster Woche gelten neue Koppelzeiten...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, title, value, description, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;