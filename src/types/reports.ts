export type StableMetrics = {
  totalHorses: number;
  totalRiders: number;
  occupancyRate: number;
  averageStayDuration: number;
};

export type MonthlyRevenue = {
  month: string;
  revenue: number;
  expenses: number;
};

export type ServiceDistribution = {
  name: string;
  value: number;
};

export type HealthMetrics = {
  type: string;
  count: number;
  month: string;
};