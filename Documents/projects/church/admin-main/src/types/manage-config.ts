// src/types/manage-config.ts
export type FieldConfig = {
  key: string;
  label: string;
  type: 'text' | 'date' | 'time' | 'tel' | 'email' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export type PageConfig = {
  title: string;
  fields: FieldConfig[];
}

export type ManageConfigs = {
  [key: string]: PageConfig;
}