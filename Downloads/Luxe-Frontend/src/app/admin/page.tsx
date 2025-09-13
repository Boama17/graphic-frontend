/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import React, { useState, useEffect } from 'react';
import { fetchProperties } from "@/lib/properties"; // <-- Import fetchProperties
import Sidebar from "./components/sidebar"
import Header from './components/header';
import StatCard from "./components/StatCard";
import statCards from "./data/statCardsData";
import PropertyCard from "./components/PropertyCard";
import DashboardTab from "./tabs/dashboard";
import PropertiesTab from "./tabs/propertiesTab";
import UsersTab from "./tabs/usersTab";
import MessagesTab from "./tabs/messagesTab";
import AnalyticsTab from "./tabs/analyticsTab";
import SettingsTab from "./tabs/settingsTab";
import PropertyModal from './modals/PropertyModal';
import UserModal from './modals/UserModal';

export default function RealtyAdminDashboard() {
  // States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState<any[]>([]);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Caleb Asiedu",
      email: "caleb005@gmail.com",
      role: "buyer",
      status: "active",
      joinDate: "2024-01-15",
      properties: 3
    },
    {
      id: 2,
      name: "Boama David",
      email: "boamadavid7@gmail.com",
      role: "agent",
      status: "active",
      joinDate: "2024-01-10",
      properties: 12
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike23@yahoo.com",
      role: "buyer",
      status: "inactive",
      joinDate: "2024-01-20",
      properties: 0
    }
  ]);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    area: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    imageUrl: '',
    status: 'active',
    agent: 'Admin User',
  });

  // User form state (unchanged)
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'buyer',
    status: 'active',
    properties: 0,
  });

  // Fetch properties from /lib/properties.ts
  useEffect(() => {
    fetchProperties().then((data) => setProperties(data));
  }, []);

  // Filtered and searched properties
  const filteredProperties = properties.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handlers for property form
  const handlePropertyInput = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPropertyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProperty = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newProperty = {
      ...propertyForm,
      id: Date.now(),
      price: Number(propertyForm.price),
      area: Number(propertyForm.area),
      bedrooms: Number(propertyForm.bedrooms),
      bathrooms: Number(propertyForm.bathrooms),
      views: 0,
      inquiries: 0,
      dateAdded: new Date().toISOString().slice(0, 10),
      imageUrl: propertyForm.imageUrl || "/api/placeholder/300/200",
      status: propertyForm.status,
      agent: propertyForm.agent,
    };
    setProperties([newProperty, ...properties]);
    setShowPropertyModal(false);
    setPropertyForm({
      title: '',
      price: '',
      area: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
      imageUrl: '',
      status: 'active',
      agent: 'Admin User',
    });
  };

  // Handlers for user form (unchanged)
  const handleUserInput = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newUser = {
      ...userForm,
      id: Date.now(),
      properties: Number(userForm.properties),
      joinDate: new Date().toISOString().slice(0, 10),
    };
    setUsers([newUser, ...users]);
    setShowUserModal(false);
    setUserForm({
      name: '',
      email: '',
      role: 'buyer',
      status: 'active',
      properties: 0,
    });
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-green-100 font-[Poppins-regular] flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <Header activeTab={activeTab} />

        {/* Page Content */}
        <main className="flex-1 p-8 bg-transparent">
          {activeTab === 'dashboard' && (
            
              <DashboardTab
                statCards={statCards}
                properties={properties}
                setShowPropertyModal={setShowPropertyModal}
                setActiveTab={setActiveTab} // <-- Add this line
              />

          )}
          {activeTab === 'properties' && (
            <PropertiesTab
              filteredProperties={filteredProperties}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              setShowPropertyModal={setShowPropertyModal}
            />
          )}
          {activeTab === 'users' && (
            <UsersTab
              users={users}
            />
          )}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Modals */}
        {showPropertyModal && (
          <PropertyModal
            propertyForm={propertyForm}
            handlePropertyInput={handlePropertyInput}
            handleAddProperty={handleAddProperty}
            setShowPropertyModal={setShowPropertyModal}
          />
        )}
        {showUserModal && (
            <UserModal
              onSave={(newUser) => {
                setUsers([newUser, ...users]);
                setShowUserModal(false);
              }}
              onClose={() => setShowUserModal(false)}
            />
          )}
    </div>
  );
}