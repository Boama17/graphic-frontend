const heroImage1 = "/hero/homeHerolg.jpg"
const heroImage2 = "/hero/homeHerosm.jpeg"

export interface HeroItem {
    id: number
    title: string
    subtitle: string
    desktopImage: string
    mobileImage: string
}

export const heroData: HeroItem[] = [
    {
        id: 1,
        title: "Welcome Home",
        subtitle: "your place to shine",
        desktopImage:heroImage1,
        mobileImage:heroImage2
    },
    {
        id: 2,
        title: "Lovereign Bible Church",
        subtitle: "the model church",
        desktopImage: "/hero/homeHerolg2.jpeg",
        mobileImage: "/hero/homeHerosm2.jpeg"
    },
    {
        id: 3,
        title: "Lovereign Bible Church",
        subtitle: "keep shining",
        desktopImage: "/hero/homeHerolg3.jpeg",
        mobileImage:  "/hero/homeHerosm3.jpeg"
    },
]


export const OurStoryheroData: HeroItem[] = [
    {
        id: 1,
        title: "Our Story",
        subtitle: "",
        desktopImage: "/hero/ourstorydesktop2.jpg",
        mobileImage: "/hero/homeHerosm.jpeg"
    },
    {
        id: 2,
        title: "God's Church",
        subtitle: "the model church",
        desktopImage: "/hero/ourstorydesktop3.jpg",
        mobileImage: "/hero/homeHerosm2.jpeg"
    },
    {
        id: 3,
        title: "Lovereign Bible Church",
        subtitle: "",
        desktopImage: "/hero/ourstorydesktop4.jpg",
        mobileImage:  "/hero/homeHerosm3.jpeg"
    },
]


export const FounderheroData: HeroItem[] = [
    {
        id: 1,
        title: "Reverend John Winfred",
        subtitle: "",
        desktopImage: "/hero/thefounderdesktop1.jpeg",
        mobileImage: "/hero/foundermobile2.jpg"
    },
    {
        id: 2,
        title: "A Leader",
        subtitle: "the model church",
        desktopImage: "/hero/founderdesktop2.jpg",
        mobileImage: "/hero/foundermobile1.jpg"
    },
    {
        id: 3,
        title: "A Visionary",
        subtitle: "",
        desktopImage: "/hero/ourstorydesktop4.jpg",
        mobileImage: "/hero/foundermobile3.jpg"
    },
]



export const MediaheroData: HeroItem[] = [
    {
        id: 1,
        title: "Media",
        subtitle: "Spreading the word",
        desktopImage: "/hero/mediadesktop1.jpg",
        mobileImage: "/hero/workerMobile2.jpg"
    },
    // {
    //     id: 2,
    //     title: "A Leader",
    //     subtitle: "the model church",
    //     desktopImage: "/hero/founderdesktop2.jpg",
    //     mobileImage: "/hero/foundermobile1.jpg"
    // },
    // {
    //     id: 3,
    //     title: "A Visionary",
    //     subtitle: "",
    //     desktopImage: "/hero/ourstorydesktop4.jpg",
    //     mobileImage: "/hero/foundermobile3.jpg"
    // },
]

export const ContactheroData: HeroItem[] = [
    {
        id: 1,
        title: "LBC Welcomes You",
        subtitle: "This is your place to shine",
        desktopImage: "/hero/contactHero.jpeg",
        mobileImage: "/hero/contactMobile.jpg"
    },
    {
        id: 1,
        title: "You are always welcome",
        subtitle: "Be a part of God's family",
        desktopImage: "/hero/contactHero2.jpeg",
        mobileImage: "/hero/contactMobile2.jpg"
    },
]

export const GiveheroData: HeroItem[] = [
    {
        id: 1,
        title: "Support Our Ministry",
        subtitle: "God loves a cheerful giver",
        desktopImage: "/hero/giveHero.jpg",
        mobileImage: "/hero/giveMobile.jpg"
    },
]