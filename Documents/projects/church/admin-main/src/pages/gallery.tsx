import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/page-header';

// Import some sample images
import image1 from '../assets/img/gallery/one.png';
import image2 from '../assets/img/gallery/two.png';
import image3 from '../assets/img/gallery/three.png';
import image4 from '../assets/img/gallery/four.png';
import image5 from '../assets/img/gallery/five.png';
import image6 from '../assets/img/gallery/six.png';
import image7 from '../assets/img/gallery/seven.png';
import image8 from '../assets/img/gallery/eight.png';
import image9 from '../assets/img/gallery/nine.png';
import image10 from '../assets/img/gallery/ten.png';

const initialGallery = [
    {
        id: 1,
        imageUrl: image1,
        title: "Prophetic Encounter",
        date: "2024-03-15"
    },
    {
        id: 2,
        imageUrl: image2,
        title: "Sunday Service",
        date: "2024-03-10"
    },
    {
        id: 3,
        imageUrl: image3,
        title: "Sunday Service",
        date: "2024-03-10"
    },
    {
        id: 4,
        imageUrl: image4,
        title: "Intensive Outreach",
        date: "2024-03-10"
    },
    {
        id: 5,
        imageUrl: image5,
        title: "Prophetic Encounter",
        date: "2024-03-10"
    },
    {
        id: 6,
        imageUrl: image6,
        title: "Sunday Service",
        date: "2024-03-10"
    },
    {
        id: 7,
        imageUrl: image7,
        title: "Sunday Service",
        date: "2024-03-10"
    },
    {
        id: 8,
        imageUrl: image8,
        title: "Prophetic Service",
        date: "2024-03-10"
    },
    {
        id: 9,
        imageUrl: image9,
        title: "Prophetic Encounter",
        date: "2024-03-10"
    },
    {
        id: 10,
        imageUrl: image10,
        title: "Sunday Service",
        date: "2024-03-10"
    },


];

function Gallery() {
    const [images, setImages] = useState(initialGallery);
    const [isDragging, setIsDragging] = useState(false);

    const handleAddImages = (newImages: FileList) => {
        const imagesToAdd = Array.from(newImages).map((file, index) => ({
            id: Date.now() + index,
            imageUrl: URL.createObjectURL(file),
            title: file.name,
            date: new Date().toISOString().split('T')[0]
        }));

        setImages(prev => [...prev, ...imagesToAdd]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleAddImages(files);
        }
    };

    return (
        <div className="w-[calc(100vw-16rem)]">
            <PageHeader
                title="Gallery"
                addButtonLabel="Upload Images"
                pageType="gallery"
                onAdd={(files) => files && handleAddImages(files)}
            />

            {/* Drop Zone */}
            <div
                className={`mt-8 mx-12 border-2 border-dashed rounded-xl p-8 transition-colors ${
                    isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <p className="text-center text-gray-500">
                    Drag and drop images here or use the Upload button above
                </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8 mx-12">
                {images.map((image) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                    >
                        <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                                <h3 className="text-lg font-semibold">{image.title}</h3>
                                <p className="text-sm">{image.date}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;