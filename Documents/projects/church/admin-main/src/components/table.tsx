import { useState } from 'react';
import Manage from './manage-window';
import { motion } from 'framer-motion';
import manage from '../assets/img/icons/manage.png';

interface TableProps {
  data: Array<{
    title: string;
    date?: string;
    times?: string;
    [key: string]: any;
  }>;
  columns?: Array<{
    key: string;
    header: string;
  }>;
  onDelete?: (item: any) => void;
  onEdit?: (item: any) => void;
  onSelect?: (item: any) => void;
  pageType: string;
}

function Table({ data, columns = [
  { key: 'title', header: 'Title' },
  { key: 'date', header: 'Date' },
  { key: 'times', header: 'Time' }
], onDelete, onEdit, onSelect, pageType }: TableProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  // Add this
  const itemsPerPage = 5;  // Add this constant

  const handleDelete = () => {
    if (onDelete && selectedItem) {
      onDelete(selectedItem);
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    if (onSelect) {
      onSelect(item);
    }
  };


  const handleEdit = (updatedItem: any) => {
    if (onEdit) {
      onEdit(updatedItem);
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  // Fix the date format in the initial data
  const formattedData = data.map(item => ({
    ...item,
    date: item.date?.padStart(10, '0')  // Ensures date has leading zeros
  }));

  const totalPages = Math.ceil(formattedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = formattedData.slice(startIndex, endIndex);


  return (
    <div className="mt-8 mx-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg"
      >
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 text-left text-sm font-semibold text-[var(--purple)]">
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-600">
                    {item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                      onClick={() => handleSelectItem(item)}
                      className="px-3 py-1 text-xs border hover:cursor-pointer border-pink-500 text-pink-500 rounded flex items-center gap-1"
                  >
                    <img src={manage} className="size-4" alt="Manage" />
                    Manage
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <motion.button
                key={number}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  number === currentPage 
                    ? "bg-[var(--purple)] text-white" 
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {number}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <Manage
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onDelete={handleDelete}
          onEdit={handleEdit}
          pageType={pageType}
      />


    </div>
  );
}

export default Table;