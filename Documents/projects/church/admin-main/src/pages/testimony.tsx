import { useState } from 'react';
import Add from '../components/add-button';
import Table from '../components/table';
import PageHeader from '../components/page-header';

const initialTestimonies = [
    {
        name: "Charlotte A.",
        title: "Supernatural Debt Cancellation.",
        testimony: "A miraculous testimony of supernatural debt cancellation and restored provision through faith and prayer cards.",
        date: "2025-04-30",
        location: "Sunday Service"
    },
    {
        name: "Joshua M.",
        title: "Deliverance from Car Accident",
        testimony: "I was saved from a Car Accident by the Mantle",
        date: "2025-04-30",
        location: "Sunday Service"
    }
];

function Testimony() {
    const [tableData, setTableData] = useState(initialTestimonies);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddItem = (newItem: any) => {
        setTableData(prevData => [...prevData, newItem]);
    };

    const handleDeleteItem = (itemToDelete: any) => {
        setTableData(prevData => prevData.filter(item => 
            item.name !== itemToDelete.name && 
            item.date !== itemToDelete.date
        ));
    };

    const handleEditItem = (updatedItem: any) => {
        setTableData(prevData =>
            prevData.map(item => {
                if (item.name === selectedItem.name && 
                    item.date === selectedItem.date) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    return (
        <div className="w-[calc(100vw-16rem)]">
            <PageHeader
                title="Testimony Reels"
                addButtonLabel="Add new testimony"
                pageType="testimonies"
                onAdd={handleAddItem}
            />
            <Table
                data={tableData}
                columns={[
                    { key: 'name', header: 'Name' },
                    { key: 'title', header: 'Title' },
                    { key: 'testimony', header: 'Testimony' },
                    { key: 'date', header: 'Date' },
                    { key: 'location', header: 'Location' }
                ]}
                pageType="testimonies"
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
                onSelect={setSelectedItem}
            />
        </div>
    );
}

export default Testimony;