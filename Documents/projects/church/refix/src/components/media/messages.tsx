"use client";
import { useState } from "react";
import { Youtube, Video, Play, Loader2 } from "lucide-react";

type PlatformCardProps = {
  icon: React.ElementType;
  color: "red" | "pink";
  title: string;
  description: string;
  src: string;
  videoId: string;
};

const VideoPlatforms = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handlePlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  const isVideoPlaying = (videoId: string) => activeVideo === videoId;

  // Enhanced platform card with global playback control
  const PlatformCard = ({
    icon: Icon,
    color,
    title,
    description,
    src,
    videoId,
  }: PlatformCardProps) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const colorClasses = {
      red: {
        bg: "bg-red-500",
        text: "text-red-500",
        shadow: "shadow-red-500/20",
        gradient: "from-red-600 to-red-500",
      },
      pink: {
        bg: "bg-pink-500",
        text: "text-pink-500",
        shadow: "shadow-pink-500/20",
        gradient: "from-pink-600 to-pink-500",
      },
    };

    const colorClass = colorClasses[color];

    return (
      <div
        className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl w-full max-w-sm overflow-hidden 
          shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-[1.02] 
          relative group border border-gray-800 ${colorClass.shadow}`}
      >
        <div className="relative">
          {/* Video Frame */}
          <div className="aspect-video overflow-hidden relative">
            <iframe
              src={`${src}${
                isVideoPlaying(videoId)
                  ? "?autoplay=1"
                  : "?controls=0&showinfo=0&rel=0&modestbranding=1&mute=1"
              }`}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
              title={`${title} Video`}
              onLoad={() => setIsVideoLoaded(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

            {/* Enhanced Loading State */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 flex flex-col items-center justify-center">
                <Loader2
                  className={`w-10 h-10 ${colorClass.text} animate-spin mb-2`}
                />
                <div className="text-sm text-white/80">Loading preview...</div>
              </div>
            )}

            {/* Play Overlay */}
            {!isVideoPlaying(videoId) && (
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                  flex items-center justify-center cursor-pointer transition-all duration-300"
                onClick={() => handlePlay(videoId)}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-${color}-500/20 flex items-center justify-center
                  transform transition-transform duration-300`}
                >
                  <Play
                    className="text-white w-8 h-8 drop-shadow-lg"
                    fill="white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 rounded-full ${colorClass.bg}/10 flex items-center justify-center mr-3`}
            >
              <Icon className={`${colorClass.text} w-5 h-5`} />
            </div>
            <h3
              className={`text-xl font-bold text-white transition-colors duration-300`}
            >
              {title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-5 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white via-white/80 to-white/50 bg-clip-text text-transparent mb-4">
            Enjoy Our Videos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience our sermons, teachings, and inspirational content across
            different platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PlatformCard
            icon={Youtube}
            color="red"
            title="YouTube Videos"
            description="Explore our full-length sermons, teachings, and church events on YouTube. Dive deeper into God's word through our video content."
            src="https://www.youtube.com/embed/qAL4h2SgtPo"
            videoId="youtube"
          />

          <PlatformCard
            icon={Video}
            color="pink"
            title="TikTok Videos"
            description="Quick insights, short teachings, and inspiring moments on TikTok,perfect for spiritual encouragement throughout your day."
            src="https://www.tiktok.com/embed/7467645060943727877"
            videoId="tiktok"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlatforms;
