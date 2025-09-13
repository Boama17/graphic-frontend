export interface ServiceTime {
    time: string
}

export interface BranchServices {
    tuesday: ServiceTime | null
    thursday?: ServiceTime | null
    friday: ServiceTime | null
    sunday: {
        morning: ServiceTime | null
        afternoon: ServiceTime | null
        evening: ServiceTime | null
    }
}

export interface Pastor {
    name: string
    photo: string
}

export interface BranchItem {
    id: number
    name: string
    pastor: Pastor
    location: string
    contact: string
    services: BranchServices
}

export const branchData: BranchItem[] = [
    {
        id: 1,
        name: "Ho S Church",
        pastor: {
            name: "Pastor Emmanuel Fiifi Robertson",
            photo: "/church_leaders/PastorEmmanuelFiifiRobert.jpg",
        },
        location: "Trafalgar (Behind Supercare Specialist and Fertility Center), Ho",
        contact: "+233 59 467 2032",
        services: {
            tuesday: { time: "6:00 PM - 8:00 PM" },
            friday: { time: "6:00 PM - 8:00 PM" },
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: { time: "10:30 AM - 12:30 PM" },
                evening: { time: "6:00 PM - 8:00 PM" },
            },
        },
    },
    {
        id: 2,
        name: "Abeka S Church",
        pastor: {
            name: "Pastor Emmanuel Yartey",
            photo: "/church_leaders/PastorEmmanuelYartey.jpg",
        },
        location: "Abeka Free Pipe Junction",
        contact: "+233 54 957 0219",
        services: {
            tuesday: { time: "6:00 PM - 8:30 PM" },
            friday: { time: "6:00 PM - 8:30 PM" },
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: { time: "10:30 AM - 12:30 PM" },
                evening: { time: "6:00 PM - 8:30 PM" },
            },
        },
    },
    {
        id: 3,
        name: "Sowutuom F Church",
        pastor: {
            name: "Pastor Moses Frimpong Boateng",
            photo: "/church_leaders/PastorMosesFrimpong.jpg",
        },
        location: "Sowutuom, Adjacent Pentecost University",
        contact: "+233 59 802 3269",
        services: {
            tuesday: { time: "7:00 PM - 9:00 PM" },
            friday: { time: "6:00 PM - 8:00 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:30 AM" },
                afternoon: { time: "12:30 PM - 2:30 PM" },
                evening: null,
            },
        },
    },
    {
        id: 5,
        name: "Adabraka F Church",
        pastor: {
            name: "Pastor Michael Oduro",
            photo: "/church_leaders/PastorMichaelOduro.jpg",
        },
        location: "Graphic Road, Opposite First Allied Savings and Loans Limited",
        contact: "+233 24 937 7622",
        services: {
            tuesday: { time: "7:00 PM - 8:30 PM" },
            friday: { time: "7:00 PM - 8:30 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:30 AM" },
                afternoon: { time: "12:30 PM - 2:30 PM" },
                evening: null,
            },
        },
    },
    {
        id: 6,
        name: "Koforidua F Church",
        pastor: {
            name: "Chief Elder Charles Phillips Fiadjoe",
            photo: "/church_leaders/ChiefElderCharlesFiadjoe.jpg",
        },
        location: "Koforidua Technical University, Getfund Hall",
        contact: "+233 59 690 0722",
        services: {
            tuesday: null,
            thursday: { time: "6:00 PM - 8:00 PM" },
            friday: null,
            sunday: {
                morning: null,
                afternoon: { time: "2:00 PM - 4:30 PM" },
                evening: null,
            },
        },
    },
    {
        id: 7,
        name: "Pantang F Church",
        pastor: {
            name: "Chief Elder Prosper Asamoah Mensah",
            photo: "/church_leaders/pastorprosper.jpeg",
        },
        location: "Trassaco, First Gate",
        contact: "+233 54 739 0354",
        services: {
            tuesday: { time: "6:00 PM - 8:00 PM" },
            friday: null,
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 8,
        name: "Tantra F Church",
        pastor: {
            name: "Pastor Herbert Togbe",
            photo: "/church_leaders/CEHerbertTogbey.jpg",
        },
        location: "Adjacent Tantra Hill Roundabout",
        contact: "+233 54 404 8436",
        services: {
            tuesday: { time: "6:00 PM - 8:30 PM" },
            friday: { time: "6:00 PM - 8:30 PM" },
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: { time: "10:40 PM - 12:30 PM" },
                evening: { time: "6:00 PM - 8:30 PM" },
            },
        },
    },
    {
        id: 20,
        name: "North Legon F Church",
        pastor: {
            name: "Chief Elder Charles Phillips Fiadjoe",
            photo: "/church_leaders/ChiefElderCharlesFiadjoe.jpg",
        },
        location: "Unique Citizens University College",
        contact: "+233 59 896 9708",
        services: {
            tuesday: { time: "6:30 PM - 8:30 PM" },
            friday: { time: "6:30 PM - 8:30 PM" },
            sunday: {
                morning: { time: "9:00 AM - 12:00 PM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 9,
        name: "Bole F Church",
        pastor: {
            name: "Pastor Michael Winfred Wilson Agbadze",
            photo: "/church_leaders/PastorMicahelAgbadze.png",
        },
        location: "Bole Resource Center for Ghana Federation of Disabled (P W D)",
        contact: "+233 24 094 6964",
        services: {
            tuesday: null,
            friday: { time: "7:00 PM - 8:00 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:00 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 10,
        name: "East Legon F Church",
        pastor: {
            name: "Pastor Terrick Naador",
            photo: "/church_leaders/CETerrick.jpg",
        },
        location: "Bethel Lodge Hotel",
        contact: "+233 54 043 6862",
        services: {
            tuesday: { time: "6:00 PM - 8:30 PM" },
            friday: { time: "6:00 PM - 8:30 PM" },
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: { time: "10:40 PM - 12:30 PM" },
                evening: { time: "6:00 PM - 8:30 PM" },
            },
        },
    },
    {
        id: 11,
        name: "Kumasi F Church",
        pastor: {
            name: "Pastor Abraham Tetteh",
            photo: "/church_leaders/PastorAbrahamTetteh.jpg",
        },
        location: "Delisa Hostel - Ayeduase - Kumasi",
        contact: "+233 59 895 8903",
        services: {
            tuesday: { time: "7:00 PM - 9:00 PM" },
            friday: { time: "7:00 PM - 9:00 PM" },
            sunday: {
                morning: { time: "8:00 AM - 11:00 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 12,
        name: "Cape Coast F Church",
        pastor: {
            name: "Pastor Essien Oppong",
            photo: "/church_leaders/CEElderEssienNana.jpg",
        },
        location: "Adjacent Saabahawk Hostel - UCC",
        contact: "+233 25 711 9791",
        services: {
            tuesday: { time: "7:30 PM - 9:30 PM" },
            friday: { time: "7:30 PM - 8:30 PM" },
            sunday: {
                morning: { time: "8:30 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 13,
        name: "Winneba F Church",
        pastor: {
            name: "Pastor Vitalis Kanyei",
            photo: "/church_leaders/PastorVitalis.jpg",
        },
        location: "",
        contact: "+233 54 325 6343",
        services: {
            tuesday: { time: "7:30 PM - 9:30 PM" },
            friday: { time: "7:30 PM - 9:30 PM" },
            sunday: {
                morning: { time: "8:30 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 14,
        name: "UPSA F Church",
        pastor: {
            name: "Pastor Peter Hagin-Wealth",
            photo: "/church_leaders/CEPeterHagin-Wealth.jpg",
        },
        location: "Madina Akosombo Junction",
        contact: "+233 53 073 0728",
        services: {
            tuesday: { time: "7:00 PM - 9:00 PM" },
            friday: { time: "6:30 PM - 8:30 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:00 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 15,
        name: "Haatso F Church",
        pastor: {
            name: "Pastor Frederick Agyemang",
            photo: "/church_leaders/CEFredAgyemang.jpg",
        },
        location: "Haatso-Atomic Main Road",
        contact: "+233 59 896 9699",
        services: {
            tuesday: { time: "7:00 PM - 9:00 PM" },
            friday: { time: "7:00 PM - 9:00 PM" },
            sunday: {
                morning: { time: "9:00 AM - 12:00 PM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 16,
        name: "Korle-Bu F Church",
        pastor: {
            name: "Pastor Charles Yekple ",
            photo: "/church_leaders/PastorCharles.jpg",
        },
        location: "Korle-Bu (Plaza opp. Ndafa Park",
        contact: "+233 079 0930",
        services: {
            tuesday: null,
            friday: { time: "7:00 PM - 8:00 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:00 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 17,
        name: "Tema F Church",
        pastor: {
            name: "Pastor Benjamin Quayson",
            photo: "/church_leaders/pastorBenjaminQuayson.jpg",
        },
        location: "Community 4, Near passport office",
        contact: "+233 24 563 3885",
        services: {
            tuesday: { time: "7:00 PM - 9:000 PM" },
            friday: { time: "7:00 PM - 9:00 PM" },
            sunday: {
                morning: { time: "8:30 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 18,
        name: "Abelenkpe F Church",
        pastor: {
            name: "Pastor Kingsley Tetteh",
            photo: "/church_leaders/PastorKingsleyTetteh.jpg",
        },
        contact: "+ 233 54 475 1612",
        location: "Abelenkpe Taxi Rank",
        services: {
            tuesday: { time: "7:00 PM - 9:00 PM" },
            friday: { time: "7:00 PM - 9:00 PM" },
            sunday: {
                morning: { time: "9:00 AM - 11:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 19,
        name: "Legon F Church",
        pastor: {
            name: "Elder Raphael Addai",
            photo: "/church_leaders/chiefElderRapheal.png",
        },
        location: "Legon Main Campus",
        contact: "+233 24 678 9543",
        services: {
            tuesday: { time: "7:30 PM - 9:30 PM" },
            friday: null,
            sunday: {
                morning: { time: "8:30 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
    {
        id: 21,
        name: "Sunyani F Church",
        pastor: {
            name: "Pastor Frank Tetteh",
            photo: "/church_leaders/FrankTettehJunior.jpg",
        },
        location: "Executive Guest House (Opposite De-Ventas Hostel, Adjacent St. Vitus School)",
        contact: "+233 24 152 2989",
        services: {
            tuesday: { time: "6:00 PM - 8:30 PM" },
            friday: { time: "6:00 PM - 8:30 PM" },
            sunday: {
                morning: { time: "8:00 AM - 10:30 AM" },
                afternoon: null,
                evening: null,
            },
        },
    },
]
