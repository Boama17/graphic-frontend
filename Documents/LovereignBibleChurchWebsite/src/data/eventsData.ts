export interface EventItem {
    id: number
    title: string
    date: string
    time:
        {
            morning: string | ""
            afternoon: string | ""
            evening: string | ""
        }
    image: string
    description?: string
    location?: string
    category?: string
}

export const eventsData: EventItem[] = [
    {
        id: 1,
        title: "Young Minister Network International",
        date: "2025-07-17",
        time: {
            morning: "9:00 AM",
            afternoon: "",
            evening: "6:00 PM",
        },
        image: "/church_flyers/newprogram2.JPG",
        description: "",
        location: "Wellspring, Achimota Ghana",
        category: "Worship",
    },
]
