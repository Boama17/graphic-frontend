import Hero from "@/components/home/Hero";
import {GiveheroData} from "@/data/heroData";
import DonationMethods from "@/components/DonationMethods";


export default function Give() {
  return (
    <div className="py-12 overflow-x-hidden"> 
        <Hero items={GiveheroData} />
        <DonationMethods />
    </div>
  )
}
