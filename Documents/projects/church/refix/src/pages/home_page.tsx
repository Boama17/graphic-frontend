import "@/app/globals.css";
import Home from "../components/home/home";
import Subscribe from "../components/home/subscribe";
import Belief from "../components/home/belief";
import Partner from "../components/home/partner";
import Testimony from "../components/home/testimony";
import Events from "../components/home/events";
import Podcast from "../components/home/podcast-home";
import Seat from "../components/home/seat";
import Announce from "../components/home/announcements";
import Footer from "../components/footer";

function HomePage() {
  return (
    <div
      style={{
        backgroundImage:
          "url('@/../public/assets/img/backgroundImages/thefounderdesktop2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
    <div className="bg-black overflow-x-hidden font-instrument">
      <Home />
      <Announce />
      <Subscribe />
      <Belief />
      <Seat />
      <Podcast />
      <Events />
      <Testimony />
      <Partner />
      <Footer />
    </div>
    // </div>
  );
}

export default HomePage;
