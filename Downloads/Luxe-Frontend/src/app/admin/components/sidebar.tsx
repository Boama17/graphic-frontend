"use client";

import {
  Home,
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export const sidebarItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "properties", icon: Home, label: "Properties" },
  { id: "users", icon: Users, label: "Users" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "analytics", icon: TrendingUp, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-[4.2rem] left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white/80 backdrop-blur border border-emerald-200 shadow"
        >
          {isOpen ? <X className="w-6 h-6 text-emerald-800" /> : <Menu className="w-6 h-6 text-emerald-800" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-xl shadow-xl z-30 flex flex-col border-r border-emerald-100 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-emerald-100">
          <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-emerald-900 font-[Elegant]">LuxeRealty</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false); // close sidebar on mobile tap
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 font-medium ${
                    activeTab === item.id
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300 shadow"
                      : "text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
