import Home from "../components/media/home";
import StreamingPlatforms from "../components/media/streamingPlatforms";
import MediaGallery from "../components/media/mediaGallery";
import Footer from "../components/footer";
import Messages from "../components/media/messages";
import SermonMessages from "../components/media/sermon-messages";
import AnimatedBackground from "../components/animatedBackground";

function Media() {
  return (
    <div className="bg-black font-instrument relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Home />
        <StreamingPlatforms />
        <Messages />
        <SermonMessages />
        <MediaGallery />
        <Footer />
      </div>
    </div>
  );
}

export default Media;
