"use client";

import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Twitch,
  Music,
  Video,
  Podcast,
} from "lucide-react";

type IconData = {
  id: number;
  icon: React.ReactElement;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
};

type Dimensions = {
  width: number;
  height: number;
};

export default function AnimatedBackground() {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const iconComponents: React.ReactElement[] = [
      <Facebook key="facebook" />,
      <Instagram key="instagram" />,
      <Twitter key="twitter" />,
      <Youtube key="youtube" />,
      <Twitch key="twitch" />,
      <Music key="music" />,
      <Video key="video" />,
      <Podcast key="podcast" />,
    ];

    const newIcons: IconData[] = [];

    for (let i = 0; i < 20; i++) {
      const randomIcon =
        iconComponents[Math.floor(Math.random() * iconComponents.length)];
      newIcons.push({
        id: i,
        icon: randomIcon,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 30 + 20,
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 1) * 1,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      });
    }

    setIcons(newIcons);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const animate = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          let newX = icon.x + icon.speedX;
          let newY = icon.y + icon.speedY;
          const newRotation = icon.rotation + icon.rotationSpeed;

          if (newX < 0 || newX > dimensions.width) {
            icon.speedX *= -1;
            newX = icon.x + icon.speedX;
          }

          if (newY < 0 || newY > dimensions.height) {
            icon.speedY *= -1;
            newY = icon.y + icon.speedY;
          }

          return {
            ...icon,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        }),
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions.width, dimensions.height]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            opacity: icon.opacity,
            transform: `rotate(${icon.rotation}deg)`,
            color: "white",
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          {React.cloneElement(icon.icon as React.ReactElement<any>, {
            style: { fontSize: `${icon.size}px` },
            className: "text-white",
          })}
        </div>
      ))}
    </div>
  );
}
