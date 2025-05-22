import { useState } from 'react';
import Modal from './add-modal';
import { motion } from 'framer-motion';
import download from "../assets/img/icons/download.png";
import user from '../assets/img/icons/user.svg';
import phone from '../assets/img/icons/phone.svg';
import email from '../assets/img/icons/email.svg';
import cloud from '../assets/img/icons/upload-cloud.svg';
import upload from '../assets/img/icons/upload.svg';
import save from '../assets/img/icons/save.svg';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'time' | 'email' | 'tel' | 'image';
  placeholder?: string;
  icon?: string;
  required?: boolean;
};

interface AddProps {
    label: string;
    pageType?: 'events' | 'teams' | 'books' | 'branches' | 'testimonies' | 'gallery'; // Make optional
    onAdd?: (newItem: any) => void;
}


const FORM_FIELDS: Record<string, FormField[]> = {
  events: [
    { name: 'title', label: 'Event Name', type: 'text', placeholder: 'Enter event name', icon: user, required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'times', label: 'Time', type: 'time', required: true }
  ],
  books: [
    { name: 'title', label: 'Book Title', type: 'text', placeholder: 'Enter book title', icon: user, required: true },
    { name: 'author', label: 'Author', type: 'text', placeholder: 'Enter author name', icon: user, required: true },
    { name: 'image', label: 'Book Cover', type: 'image', required: true }
  ],
  branches: [
    { name: 'branchName', label: 'Branch Name', type: 'text', placeholder: 'Enter branch name', icon: user, required: true },
    { name: 'pastorName', label: 'Pastor Name', type: 'text', placeholder: 'Enter pastor name', icon: user, required: true },
    { name: 'contact', label: 'Contact', type: 'tel', placeholder: 'Enter contact number', icon: phone, required: true },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter branch location', icon: user, required: true }
  ],
  testimonies: [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', icon: user, required: true },
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter testimony title', icon: user, required: true },
    { name: 'testimony', label: 'Testimony', type: 'text', placeholder: 'Enter testimony', icon: user, required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'Enter church location', icon: user, required: true },
  ],

  gallery: [
    {
      name: 'images',
      label: 'Images',
      type: 'image',
      required: true,
      multiple: true // Add this property
    }
  ]

};

const Add = ({ label, pageType, onAdd }: AddProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Move this line before using fields in JSX
  const fields = FORM_FIELDS[pageType] || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add - handleSubmit called with formData:', formData);
    if (onAdd) {
      console.log('Add - calling onAdd function');
      onAdd(formData);
      setFormData({});
      setIsOpen(false);
    } else {
      console.log('Add - onAdd function is not defined');
    }
  };


  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex gap-2 px-12 rounded bg-[#CC0066] hover:cursor-pointer shadow-lg w-max py-1 text-white place-self-end"
      >
        {label}
        <img src={download} className="size-4 mt-1" alt="" />
      </motion.button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold -mt-4 tracking-wider">
                    Add New {pageType ? pageType.charAt(0).toUpperCase() + pageType.slice(1, -1) : 'Item'}
                </h2>

              {fields.map(field => (
                  field.type === 'image' ? (
                      <div key={field.name} className="img mt-10">
                        <label className="text-xs font-semibold">{field.label}</label>
                        <div
                            className="border border-gray-300 rounded-lg p-6 text-center w-full mx-auto"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleImageDrop}
                        >
                          <div className="flex justify-center mb-4">
                            <img src={cloud} alt="Upload Icon" />
                          </div>
                          {formData.images && formData.images.length > 0 && (
                              <div className="flex justify-center gap-2 mb-4 flex-wrap">
                                {Array.from(formData.images).map((file: File, index: number) => (
                                    <div key={index} className="relative">
                                      <img
                                          src={URL.createObjectURL(file)}
                                          alt={`Preview ${index + 1}`}
                                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                                      />
                                    </div>
                                ))}
                              </div>
                          )}
                          <p className="text-gray-700">
                            {formData.images ?
                                `${formData.images.length} images selected` :
                                "Drag and drop images here to upload"
                            }
                          </p>
                          <p className="text-gray-500 text-sm my-2">OR</p>
                          <label className="bg-[#6801CB] shadow-lg text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-48 mx-auto cursor-pointer">
                            Upload from device
                            <img src={upload} alt="Upload Icon" />
                            <input
                                type="file"
                                name={field.name}
                                accept="image/*"
                                multiple={field.multiple}
                                className="hidden"
                                onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      </div>
                  ) : (
                      <div key={field.name} className="flex flex-col mt-6">
                <label htmlFor={field.name} className="text-xs font-semibold">{field.label}</label>
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 border-1 py-2 px-12 rounded"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                  {field.icon && (
                    <img src={field.icon} className="-mt-5 ms-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" alt="" />
                  )}
                </div>
              </div>
            )
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-12 place-content-center shadow-lg mt-5 py-2 hover:cursor-pointer rounded-md text-white flex gap-3 bg-[#6801CB]"
          >
            <span>Save</span>
            <img src={save} className="mt-1" alt="" />
          </motion.button>
        </form>
      </Modal>
    </>
  );
};

export default Add;