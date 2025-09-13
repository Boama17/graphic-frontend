import Contact from "@/components/contact/contact";
import Hero from "@/components/home/Hero";
import {ContactheroData} from "@/data/heroData";


export default function ContactUs() {
  return (
      <div className="py-12">
          <Hero items={ContactheroData} />
          <Contact />
      </div>
      )


}
