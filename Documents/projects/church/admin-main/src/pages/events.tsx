import Add from '../components/add-button';
import { useState } from 'react';
import Table from '../components/table';
import PageHeader from '../components/page-header';

const initialEvents = [
    {
        title: "Apostolic Encounter",
        date: "2025-22-05",
        times: "06:00 PM"
    },
    {
        title: "The Triology",
        date: "2025-08-06",
        times: "2:00 PM"
    },
    {
        title: "Word Explosion Conference",
        date: "2025-14-05",
        times: "6:00 PM"
    },
    {
        title: "Business Plan Workshop",
        date: "2025-12-05",
        times: "7:00 PM"
    },
];
function Events() {
    const [tableData, setTableData] = useState(initialEvents);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddItem = (newItem: any) => {
        setTableData(prevData => [...prevData, newItem]);
    };

    const handleDeleteItem = (itemToDelete: any) => {
        console.log('Deleting item:', itemToDelete);
        setTableData(prevData => prevData.filter(item =>
            item.title !== itemToDelete.title ||
            item.date !== itemToDelete.date ||
            item.times !== itemToDelete.times
        ));
    };

    const handleEditItem = (updatedItem: any) => {
        console.log('Editing item:', updatedItem);
        setTableData(prevData =>
            prevData.map(item => {
                // Compare all fields to identify the exact item to update
                if (item.title === selectedItem.title &&
                    item.date === selectedItem.date &&
                    item.times === selectedItem.times) {
                    return updatedItem;
                }
                return item;
            })
        );
    };


    return (
        <div className="w-[calc(100vw-16rem)]">
            <PageHeader
                title="Events"
                addButtonLabel="Add new event"
                pageType="events"
                onAdd={handleAddItem}
            />
            <Table
                data={tableData}
                columns={[
                    { key: 'title', header: 'Event Name' },
                    { key: 'date', header: 'Date' },
                    { key: 'times', header: 'Time' }
                ]}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
                onSelect={setSelectedItem}
            />
        </div>
    );
}

export default Events;