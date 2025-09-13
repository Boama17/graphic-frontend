import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

export default function StatCard({ title, value, change, icon: Icon, color, bg }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl min-w-[16rem] md:min-w-[12rem] lg:min-w-[10rem] p-4 md:p-5 lg:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className={`p-2 md:p-3 rounded-lg ${bg}`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
        </div>
        <span className="text-green-600 text-xs md:text-sm font-medium bg-green-50 px-2 py-1 rounded">{change}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-xs md:text-sm">{title}</p>
    </div>
  );
}