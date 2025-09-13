"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Calendar, X} from "lucide-react";
import type {EventItem} from "@/data/eventsData";
import Image from "next/image";

interface EventCountdownBadgeProps {
  events: EventItem[];
}

export default function EventCountdownBadge({ events }: EventCountdownBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  // Find the most recent upcoming event
  const getNextEvent = (): EventItem | null => {
    if (!events || events.length === 0) return null;

    const now = new Date();
    const upcomingEvents = events
        .filter((event) => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  };

  const nextEvent = getNextEvent();

  // Calculate countdown
  useEffect(() => {
    if (!nextEvent) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(nextEvent.date);

      if (nextEvent.time.morning) {
        const [hours, minutes] = nextEvent.time.morning.split(":")[0].split(" ")[0].split(":");
        eventDate.setHours(parseInt(hours));
        eventDate.setMinutes(parseInt(minutes) || 0);
      }

      const difference = eventDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setCountdown(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [nextEvent]);

  if (!nextEvent || !countdown) return null;

  return (
      <>
        {/* Countdown Badge */}
        <motion.div
            className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg cursor-pointer z-50"
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
          <div className="flex items-center p-3 pr-5">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <div className="text-xs font-semibold text-gray-800">Next Event</div>
              <div className="text-sm font-bold text-blue-600">
                {countdown.days > 0 ? `${countdown.days}d ` : ""}
                {countdown.hours}h {countdown.minutes}m
              </div>
            </div>
          </div>
        </motion.div>

        {/* Event Slider Modal */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
              >
                <motion.div
                    className="bg-black rounded-xl overflow-hidden w-[90%] max-w-4xl relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                  <button
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
                      onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>

                  {/* Image Container */}
                  <div className="flex flex-col items-center bg-transparent">
                    <div className="w-full h-[60vh] relative">
                      <Image
                          src={"/church_flyers/countdown.jpeg"}
                          alt={nextEvent.title}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-t-xl"
                          priority
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}
