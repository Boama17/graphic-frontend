import Hero from "@/components/home/Hero";
import {MediaheroData} from "@/data/heroData";
import StreamingPlatforms from "@/components/media/streamingPlatforms";
import SermonMessages from "@/components/media/SermonMessages";
import PhotoGallery from "@/components/media/photoGallery";


export default function Media() {
  return (
    <div className="">
        <Hero items={MediaheroData} />
        <StreamingPlatforms />
        <SermonMessages />
        <PhotoGallery />
    </div>
  )
}
