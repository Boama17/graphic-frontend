import React from "react";
import Home from "../components/our-story/home";
import Rooted from "../components/our-story/rooted";
import FounderStory from "../components/our-story/founder-story";
import Missionvision from "../components/our-story/missio&vision";
import Branches from "../components/our-story/branches";
import Announce from "../components/home/announcements";
import Footer from "../components/footer";
import founder2 from "@/../public/assets/img/backgroundImages/thefounderdesktop2.jpg"
const our_story_page = () => {
  return (
    <div
      style={{
        backgroundImage:
         founder2.src,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
     
    >
      <div className="bg-opacity-70 overflow-x-hidden font-instrument">
        <Home />
        <Rooted />
        <FounderStory />
        <Missionvision />
        <Branches />
        <Announce />
        <Footer />
      </div>
    </div>
  );
};

export default our_story_page;
