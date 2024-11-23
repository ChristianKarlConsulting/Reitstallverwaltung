import React from 'react';
import { Horse, Users, Barn, DollarSign } from 'lucide-react';
import MetricsCard from '../components/Reports/MetricsCard';
import RevenueChart from '../components/Reports/RevenueChart';
import ServicesPieChart from '../components/Reports/ServicesPieChart';
import HealthMetricsChart from '../components/Reports/HealthMetricsChart';
import type {
  StableMetrics,
  MonthlyRevenue,
  ServiceDistribution,
  HealthMetrics,
} from '../types/reports';

// Beispieldaten - In einer echten App würden diese von einer API kommen
const mockStableMetrics: StableMetrics = {
  totalHorses: 24,
  totalRiders: 32,
  occupancyRate: 85,
  averageStayDuration: 18,
};

const mockRevenueData: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 13500, expenses: 8200 },
  { month: 'Mär', revenue: 13200, expenses: 8400 },
  { month: 'Apr', revenue: 14800, expenses: 8300 },
  { month: 'Mai', revenue: 15200, expenses: 8600 },
  { month: 'Jun', revenue: 16000, expenses: 8800 },
];

const mockServiceData: ServiceDistribution[] = [
  { name: 'Boxenmiete', value: 45 },
  { name: 'Reitunterricht', value: 25 },
  { name: 'Pensionspferde', value: 15 },
  { name: 'Zusatzleistungen', value: 10 },
  { name: 'Sonstiges', value: 5 },
];

const mockHealthData: HealthMetrics[] = [
  { type: 'Tierarzt', count: 8, month: 'Jan' },
  { type: 'Tierarzt', count: 6, month: 'Feb' },
  { type: 'Tierarzt', count: 10, month: 'Mär' },
  { type: 'Tierarzt', count: 7, month: 'Apr' },
  { type: 'Tierarzt', count: 9, month: 'Mai' },
  { type: 'Tierarzt', count: 8, month: 'Jun' },
];

const Berichte = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Berichte & Statistiken</h1>
        <p className="mt-2 text-gray-600">
          Übersicht über alle wichtigen Kennzahlen des Reitstalls
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Pferde"
          value={mockStableMetrics.totalHorses}
          change={5}
          icon={Horse}
          description="Aktive Pferde im Stall"
        />
        <MetricsCard
          title="Reiter"
          value={mockStableMetrics.totalRiders}
          change={8}
          icon={Users}
          description="Registrierte Reiter"
        />
        <MetricsCard
          title="Auslastung"
          value={`${mockStableMetrics.occupancyRate}%`}
          change={2}
          icon={Barn}
          description="Aktuelle Stallauslastung"
        />
        <MetricsCard
          title="Verweildauer"
          value={`${mockStableMetrics.averageStayDuration} Monate`}
          icon={DollarSign}
          description="Durchschnittliche Aufenthaltsdauer"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={mockRevenueData} />
        <ServicesPieChart data={mockServiceData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <HealthMetricsChart data={mockHealthData} />
      </div>
    </div>
  );
};

export default Berichte;