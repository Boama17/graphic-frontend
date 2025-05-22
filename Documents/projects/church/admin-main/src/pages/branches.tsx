// branches.tsx
import { useState } from 'react';
import Add from '../components/add-button';
import Table from '../components/table';

const branches = [
    {
        branchName: "Ho S Church",
        pastorName: "Pastor Emmanuel Fiifi Robertson",
        location: "Trafalgar (Behind Supercare Specialist and Fertility Center), Ho",
        contact: "Not specified"
    },
    {
        branchName: "Abeka S Church",
        pastorName: "Pastor Emmanuel Yartey",
        location: "Abeka Free Pipe Junction",
        contact: "Not specified"
    },
    {
        branchName: "Sowutuom F Church",
        pastorName: "Pastor Moses Frimpong Boateng",
        location: "Sowutuom, Adjacent Pentecost University",
        contact: "Not specified"
    },
    {
        branchName: "Adabraka F Church",
        pastorName: "Pastor Michael Oduro",
        location: "Graphic Road, Opposite First Allied Savings and Loans Limited",
        contact: "Not specified"
    },
    {
        branchName: "Koforidua F Church",
        pastorName: "Chief Elder Charles Phillips Fiadjoe",
        location: "Koforidua Technical University, Getfund Hall",
        contact: "Not specified"
    },
    {
        branchName: "Pantang F Church",
        pastorName: "Chief Elder Prosper Asamoah Mensah",
        location: "Royal First Gate, Pantang",
        contact: "Not specified"
    },
    {
        branchName: "Tantra F Church",
        pastorName: "Pastor Herbert Togbe",
        location: "Location not specified",
        contact: "Not specified"
    },
    {
        branchName: "North Legon F Church",
        pastorName: "Chief Elder Charles Phillips Fiadjoe",
        location: "Unique Citizens University College",
        contact: "Not specified"
    },
    {
        branchName: "Bole F Church",
        pastorName: "Pastor Michael Winfred Wilson Agbadze",
        location: "Bole Resource Center for Ghana Federation of Disabled (P W D)",
        contact: "Not specified"
    },
    {
        branchName: "East Legon F Church",
        pastorName: "Pastor Terrick Naador",
        location: "Location not specified",
        contact: "Not specified"
    },
    {
        branchName: "Kumasi F Church",
        pastorName: "Pastor Abraham Tetteh",
        location: "Delisa Hostel - Ayeduase - Kumasi",
        contact: "Not specified"
    },
    {
        branchName: "Cape Coast F Church",
        pastorName: "Pastor Essien Nana",
        location: "Adjacent Saabahawk Hostel - UCC",
        contact: "Not specified"
    },
    {
        branchName: "Winneba F Church",
        pastorName: "Pastor Vitalis Kanyei",
        location: "Location not specified",
        contact: "Not specified"
    },
    {
        branchName: "UPSA F Church",
        pastorName: "Pastor Peter Hagin-Wealth",
        location: "Madina Rawlings Circle",
        contact: "Not specified"
    },
    {
        branchName: "Haatso F Church",
        pastorName: "Pastor Frederick Agyemang",
        location: "Haatso-Atomic Main Road",
        contact: "Not specified"
    },
    {
        branchName: "Korle-Bu F Church",
        pastorName: "Pastor Charles Yekple",
        location: "Korle-Bu (Plaza opp. Ndafa Park)",
        contact: "Not specified"
    },
    {
        branchName: "Tema F Church",
        pastorName: "Pastor Benjamin Quayson",
        location: "Community 4, Near passport office",
        contact: "Not specified"
    },
    {
        branchName: "Abelenkpe F Church",
        pastorName: "Pastor Kingsley Tetteh",
        location: "Abelenkpe, Adjacent Santa Market",
        contact: "Not specified"
    },
    {
        branchName: "Legon F Church",
        pastorName: "Elder Raphael Addai",
        location: "Legon Main Campus",
        contact: "Not specified"
    },
    {
        branchName: "Sunyani F Church",
        pastorName: "Pastor Frank Tetteh",
        location: "Executive Guest House (Opposite De-Ventas Hostel, Adjacent St. Vitus School)",
        contact: "Not specified"
    }
];
const columns = [
    { key: 'branchName', header: 'Branch Name' },
    { key: 'pastorName', header: 'Pastor Name' },
    { key: 'contact', header: 'Contact' },
    { key: 'location', header: 'Location' }
];

function Branches() {
    const [tableData, setTableData] = useState(branches);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAddItem = (newItem: any) => {
        setTableData(prevData => [...prevData, newItem]);
    };

    const handleDeleteItem = (itemToDelete: any) => {
        setTableData(prevData => prevData.filter(item =>
            item.branchName !== itemToDelete.branchName
        ));
    };

    const handleEditItem = (updatedItem: any) => {
        setTableData(prevData =>
            prevData.map(item => {
                if (item.branchName === selectedItem.branchName) {
                    return updatedItem;
                }
                return item;
            })
        );
    };

    return (
        <div className="w-[calc(100vw-16rem)]">
            <div className="header mt-14 flex ms-12 me-12 w-[calc(100vw-(20rem)]">
                <h1 className="text-[var(--purple)] underline underline-offset-[0.5rem]">Branches</h1>
                <div className="case ms-auto -me-10">
                    <Add label='Add Branch' pageType='branches' onAdd={handleAddItem}/>
                </div>
            </div>

            <div className="space-y-10 p-5">
                <Table
                    data={tableData}
                    columns={columns}
                    pageType="branches"
                    onDelete={handleDeleteItem}
                    onEdit={handleEditItem}
                    onSelect={setSelectedItem}
                />
            </div>
        </div>
    );
}

export default Branches;