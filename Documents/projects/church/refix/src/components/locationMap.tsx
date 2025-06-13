import React, { useEffect, useRef } from "react";
import L from "leaflet";

type LocationMapProps = {
  latitude: number;
  longitude: number;
};

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }
    const map = L.map("mapid").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const markerIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    L.marker([latitude, longitude], { icon: markerIcon }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div id="mapid" className="h-full w-full"></div>;
};

export default LocationMap;
