export interface TestimonyItem {
    id: number
    name: string
    role?: string
    testimony: string
    image?: string
    date?: string
    location?: string
}

export const testimonyData: TestimonyItem[] = [
    {
        id: 1,
        name: "Charlotte A.",
        role: "Church Member",
        testimony:
            "I thank God for a miraculous testimony and Pastor for introducing prayer cards. My family faced over GHC 38,000 in debts, with GHC 8,000 owed to ECG for electricity. My mother lost her job, and we struggled daily.\n" +
            "\n" +
            'One Sunday, Pastor mentioned "Supernatural Debt Cancellation," and I took it as a declaration. On my prayer card, I wrote down two requests: for supernatural debt cancellation and for my mom\'s work restoration.\n' +
            "\n" +
            "During vacation, my mom received capital to start working again, and most of her debts were paid. Miraculously, our ECG meter reset to zero, erasing the debt. Later, ECG replaced the meter, showing only GHC 86 owed.\n" +
            "\n" +
            "This is a true miracle! I thank God and Pastor for the prayer cards and faith-filled declarations. God is faithful!",
        image: "/images/testimonies/sarah.jpg",
        date: "April 2025",
        location: "Wellspring, Achimota Ghana",
    },
    {
        id: 2,
        name: "Joshua M.",
        role: "Church Member",
        testimony:
            "I thank God for saving my life during a near-fatal car accident. Despite a dangerous swerve to avoid a head-on collision, our vehicle safely exited the bush without injury. I was calm, knowing I carried my mantle, a symbol of divine protection. Glory to God for the gift of life and for teaching us the power of faith through mantles!",
        image: "/images/testimonies/michael.jpg",
        date: "April 2025",
        location: "WellSpring, Achimota Ghana",
    },

]
