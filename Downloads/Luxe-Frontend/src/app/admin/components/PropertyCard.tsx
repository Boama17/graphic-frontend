import { MoreVertical, Eye, MessageSquare, MapPin } from "lucide-react";
import Image from "next/image";
import { Property } from "@/lib/properties";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-shadow duration-200 group">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
            property.status === 'active' ? 'bg-green-100 text-green-800' :
            property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            property.status === 'sold' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {(property.status ? property.status.charAt(0).toUpperCase() + property.status.slice(1) : "Unknown")}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white shadow transition-colors">
            <MoreVertical className="w-5 h-5 text-emerald-700" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-white font-bold text-lg drop-shadow">₵{property.price?.toLocaleString()}</span>
          <span className="bg-white/80 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold shadow">{property.area} sq ft</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-emerald-900 text-lg mb-1 truncate">{property.title}</h3>
        <p className="text-emerald-700 text-sm mb-3 flex items-center truncate">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </p>
        <div className="flex items-center justify-between text-sm text-emerald-800 mb-3">
          <span className="flex items-center gap-1">
            <span className="font-medium">{property.bedrooms}</span> bed
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{property.bathrooms}</span> bath
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Agent: <span className="font-medium text-emerald-800">{property.agent || "—"}</span></span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {property.views ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {property.inquiries ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}