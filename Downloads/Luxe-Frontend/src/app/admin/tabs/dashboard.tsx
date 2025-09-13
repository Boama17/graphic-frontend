/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import StatCard from "../components/StatCard";
import PropertyCard from "../components/PropertyCard";
import { Plus, UserCheck, MessageCircle } from "lucide-react";
import { fetchProperties, subscribeToPropertyUpdates } from "@/lib/properties";

export default function DashboardTab({
  statCards,
  properties,
  setShowPropertyModal,
  setActiveTab,
}: {
  statCards: any[];
  properties: any[];
  setShowPropertyModal: (show: boolean) => void;
  setActiveTab: (tab: string) => void;
}) {
  const [localProperties, setLocalProperties] = useState(properties);

  useEffect(() => {
    // Subscribe to property updates
    const unsubscribe = subscribeToPropertyUpdates(() => {
      // Refresh properties when updates occur
      fetchProperties().then(updatedProperties => {
        setLocalProperties(updatedProperties);
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/90 rounded-2xl shadow border border-emerald-100 p-8">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Recent Properties</h3>
            <div className="space-y-4">
              {localProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
        {/* Rest of the component remains the same */}
        <div>
          <div className="bg-white/90 rounded-2xl shadow border border-emerald-100 p-4 md:p-6 lg:p-4">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowPropertyModal(true)}
                className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 text-left bg-emerald-50 text-emerald-800 rounded-xl hover:bg-emerald-100 font-medium text-sm md:text-base"
              >
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden xs:inline">Add New Property</span>
                <span className="inline xs:hidden">Add</span>
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 text-left bg-yellow-50 text-yellow-800 rounded-xl hover:bg-yellow-100 font-medium text-sm md:text-base"
              >
                <UserCheck className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden xs:inline">Approve Agents</span>
                <span className="inline xs:hidden">Agents</span>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className="w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 text-left bg-green-50 text-green-800 rounded-xl hover:bg-green-100 font-medium text-sm md:text-base"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden xs:inline">View Messages</span>
                <span className="inline xs:hidden">Messages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}