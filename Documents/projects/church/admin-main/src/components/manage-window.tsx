// manage-window.tsx
import { useState, useEffect } from "react";
import manage from '../assets/img/icons/manage.png';
import { X, PencilLine, Trash2 } from "lucide-react";
import { manageConfigs } from '../configs/manage-configs';

interface ManageProps {
    isOpen: boolean;
    onClose: () => void;
    item: Record<string, any> | null;
    onDelete: () => void;
    onEdit: (updatedItem: any) => void;
    pageType: string;
}

const Manage = ({ isOpen, onClose, item, onDelete, onEdit, pageType }: ManageProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const config = manageConfigs[pageType];

    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        if (formData) {
            onEdit(formData);
            setIsEditing(false);
            onClose();
            setFormData(null);
        }
    };



    const handleDelete = () => {
    onDelete();
  };

  const handleClose = () => {
    setIsEditing(false);
    setFormData(null);
    onClose();
  };

  // If not open, don't render anything
  if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="fixed inset-0 bg-transparent" onClick={handleClose} />

            <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-lg relative z-10">
                {/* Header */}
                <div className="flex gap-2">
                    <img src={manage} className="size-6 mt-0.5" alt="" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {config.title}
                    </h2>
                </div>

                {/* Content */}
                {isEditing ? (
                    <div className="space-y-3">
                        {config.fields.map((field) => (
                            <div key={field.key} className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.key}
                                    value={formData?.[field.key] || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {config.fields.map((field) => (
                            <p key={field.key}>
                                <strong>{field.label}:</strong> {formData?.[field.key]}
                            </p>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end mt-6 gap-4">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-[var(--purple)] text-white rounded-xl hover:bg-purple-600"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-[var(--purple)] text-white rounded-xl hover:bg-purple-600"
                        >
                            <PencilLine className="w-4 h-4 mr-1" /> Edit
                        </button>
                    )}
                    <button
                        onClick={onDelete}
                        className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-red-600"
                    >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Manage;
