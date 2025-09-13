"use client";

import React, { useState } from "react";
import { Plus, User } from "lucide-react";
import UserModal from "../modals/UserModal";


interface UserType {
  id?: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate?: string;
  properties: number;
}

export default function UsersTab({
  users,
}: {
  users: UserType[];
}) {
  const [userList, setUserList] = useState(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  // Open modal for add
  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  // Open modal for edit
  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // Delete user
  const handleDelete = (id?: number) => {
    if (!id) return;
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUserList((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Save user (add or edit)
  const handleSaveUser = (user: UserType) => {
    if (editingUser) {
      // Edit
      setUserList((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add
      setUserList((prev) => [
        { ...user, id: Date.now(), joinDate: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
    }
    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Users</h2>
          <p className="text-emerald-700">Manage users and agents</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/90 rounded-2xl shadow border border-emerald-100 overflow-hidden">
        <table className="min-w-full divide-y divide-emerald-100">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Properties
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-emerald-50">
            {userList.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-sm">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "agent"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.properties}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {modalOpen && (
        <UserModal
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => {
            setModalOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}
