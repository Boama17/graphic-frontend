import {Calendar, Sparkles, Sun} from "lucide-react";

export const services = [
    {
        id: 1,
        title: "Tuesday Midweek Service",
        time: "6:00 PM - 8:30 PM",
        description: "Prayer & Bible Study",
        location: "Wellspring, Achimota Ghana",
        icon: Calendar,
        gradient: "from-blue-500 to-blue-600",
        bgGradient: "from-blue-50 to-blue-100/50",
        iconBg: "from-blue-100 to-blue-200",
    },
    {
        id: 2,
        title: "Friday Service",
        time: "6:00 PM - 8:30 PM",
        description: "Supernatural Encounter Night",
        location: "Wellspring, Achimota Ghana",
        icon: Sparkles,
        gradient: "from-purple-500 to-purple-600",
        bgGradient: "from-purple-50 to-purple-100/50",
        iconBg: "from-purple-100 to-purple-200",
    },
    {
        id: 3,
        title: "Sunday Services",
        time: "8:00 AM • 10:30 AM • 5:00 PM",
        description: "Three Services Available",
        location: "Wellspring, Achimota Ghana",
        icon: Sun,
        gradient: "from-amber-500 to-orange-500",
        bgGradient: "from-amber-50 to-orange-100/50",
        iconBg: "from-amber-100 to-orange-200",
        featured: true,
    },
]
