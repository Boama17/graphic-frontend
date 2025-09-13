/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import PropertyCard from "../components/PropertyCard";
import { Plus, Search } from "lucide-react";
import { fetchProperties, subscribeToPropertyUpdates } from "@/lib/properties";

export default function PropertiesTab({
  filteredProperties,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  setShowPropertyModal,
}: {
  filteredProperties: any[];
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  setShowPropertyModal: (show: boolean) => void;
}) {
  const [localProperties, setLocalProperties] = useState(filteredProperties);

  useEffect(() => {
    // Update local properties when filtered properties change
    setLocalProperties(filteredProperties);
  }, [filteredProperties]);

  useEffect(() => {
    // Subscribe to property updates
    const unsubscribe = subscribeToPropertyUpdates(() => {
      // Refresh properties when updates occur
      fetchProperties().then(updatedProperties => {
        // Apply current filters to the updated properties
        const filtered = updatedProperties.filter(property => {
          const matchesSearch = !searchTerm || 
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
          return matchesSearch && matchesStatus;
        });
        setLocalProperties(filtered);
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [searchTerm, filterStatus]); // Re-subscribe when filters change

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-900">Properties</h2>
          <p className="text-emerald-700 text-sm sm:text-base">Manage all property listings</p>
        </div>
        <button
          onClick={() => setShowPropertyModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden xs:inline">Add Property</span>
          <span className="inline xs:hidden">Add</span>
        </button>
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-800 focus:border-transparent bg-white text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-800 focus:border-transparent bg-white text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {localProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}