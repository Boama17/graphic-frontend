// src/configs/manage-configs.ts
import { ManageConfigs } from '../types/manage-config';

export const manageConfigs: ManageConfigs = {
  events: {
    title: 'Event Details',
    fields: [
      { key: 'title', label: 'Event Name', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'times', label: 'Time', type: 'time', required: true }
    ]
  },
  branches: {
    title: 'Branch Details',
    fields: [
      { key: 'branchName', label: 'Branch Name', type: 'text', required: true },
      { key: 'pastorName', label: 'Pastor Name', type: 'text', required: true },
      { key: 'contact', label: 'Contact', type: 'tel', required: true },
      { key: 'location', label: 'Location', type: 'text', required: true }
    ]
  },
  testimonies: {
    title: 'Testimony Details',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'testimony', label: 'Testimony', type: 'textarea', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'location', label: 'Location', type: 'text', required: true }
    ]
  },

};