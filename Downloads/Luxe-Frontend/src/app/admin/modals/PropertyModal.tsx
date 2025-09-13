/* eslint-disable @typescript-eslint/no-explicit-any */

import { X, Save } from "lucide-react";
import React from "react";

interface PropertyModalProps {
  propertyForm: any;
  handlePropertyInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddProperty: (e: React.FormEvent) => void;
  setShowPropertyModal: (show: boolean) => void;
}

export default function PropertyModal({
  propertyForm,
  handlePropertyInput,
  handleAddProperty,
  setShowPropertyModal,
}: PropertyModalProps) {
  return (
    <div className="fixed inset-0 bg-red-950 backdrop-blur-md  bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Property</h2>
          <button
            onClick={() => setShowPropertyModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form className="p-6" onSubmit={handleAddProperty}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              name="title"
              value={propertyForm.title}
              onChange={handlePropertyInput}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter property title"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₵)</label>
              <input
                name="price"
                value={propertyForm.price}
                onChange={handlePropertyInput}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
              <input
                name="area"
                value={propertyForm.area}
                onChange={handlePropertyInput}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              name="location"
              value={propertyForm.location}
              onChange={handlePropertyInput}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                name="bedrooms"
                value={propertyForm.bedrooms}
                onChange={handlePropertyInput}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                name="bathrooms"
                value={propertyForm.bathrooms}
                onChange={handlePropertyInput}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={propertyForm.description}
              onChange={handlePropertyInput}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter property description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              name="imageUrl"
              value={propertyForm.imageUrl}
              onChange={handlePropertyInput}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Paste image URL or leave blank"
            />
          </div>
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowPropertyModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}