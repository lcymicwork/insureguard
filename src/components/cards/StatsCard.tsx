import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export default function StatsCard({ label, value, trend, icon: Icon, iconColor, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <span className="text-secondary-600">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-secondary-900">{value}</p>
      {trend && <p className="text-sm text-secondary-500 mt-1">{trend}</p>}
    </div>
  );
}
