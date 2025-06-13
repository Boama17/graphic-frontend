import React from "react";
import "leaflet/dist/leaflet.css";
import LocationMap from "../locationMap";

const OurLocation = () => {
  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Location</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Details */}
          <div className="bg-[#1a1a1a] p-8 rounded-xl flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">Headquarters</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                <strong>Address:</strong> Dome Pillar Two Road
              </p>
              <p className="text-gray-300">
                <strong>Landmark:</strong> Near PUMA Filling Station
              </p>
              <p className="text-gray-200">
                <strong>Available Hours:</strong>
                <br />
                Tue - Fri: 10:00 AM - 5:00 PM
                <br />
                Sat: 10:00 AM - 3:00 PM
                <br />
                Sun: 08:00 AM - 11:59 PM
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden">
            <div className=" w-full h-full " id="bigBox1Child2">
              <div className="w-full h-72 bg-[#F2F9FC] flex justify-center">
                <div id="mapid" className="w-full h-[100%] z-0">
                  <LocationMap latitude={5.639626} longitude={-0.219699} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurLocation;
