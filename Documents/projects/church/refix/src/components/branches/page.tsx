"use client";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MapPinned,
  Phone,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// Use imports for images from public/assets/img
import CEElderEssienNana from "@/../public/assets/img/church_leaders/pastoressien.png";
import CEElderProsperAsamoah from "@/../public/assets/img/church_leaders/pastorprosper.jpeg";
import CEFredAgyemang from "@/../public/assets/img/church_leaders/CEFredAgyemang.jpg";
import CEPeterHaginWealth from "@/../public/assets/img/church_leaders/CEPeterHagin-Wealth.jpg";
import ChiefElderCharlesFiadjoe from "@/../public/assets/img/church_leaders/ChiefElderCharlesFiadjoe.jpg";
import FrankTettehJunior from "@/../public/assets/img/church_leaders/FrankTettehJunior.jpg";
import PastorAbrahamTetteh from "@/../public/assets/img/church_leaders/PastorAbrahamTetteh.jpg";
import PastorCharles from "@/../public/assets/img/church_leaders/PastorCharles.jpg";
import PastorEmmanuelFiifiRobert from "@/../public/assets/img/church_leaders/PastorEmmanuelFiifiRobert.jpg";
import PastorEmmanuelYartey from "@/../public/assets/img/church_leaders/PastorEmmanuelYartey.jpg";
import PastorMichaelOduro from "@/../public/assets/img/church_leaders/PastorMichaelOduro.jpg";
import PastorBenjaminQuayson from "@/../public/assets/img/church_leaders/pastorBenjaminQuayson.jpg";
import PastorMosesFrimpong from "@/../public/assets/img/church_leaders/PastorMosesFrimpong.jpg";
import PastorVitalis from "@/../public/assets/img/church_leaders/PastorVitalis.jpg";
import CEHerbertTogbey from "@/../public/assets/img/church_leaders/CEHerbertTogbey.jpg";
import ShepherdKingsleyTetteh from "@/../public/assets/img/church_leaders/PastorKingsleyTetteh.jpg";
import CETerrickNaador from "@/../public/assets/img/church_leaders/CETerrick.jpg";
import noPicture from "@/../public/assets/img/church_leaders/noPic.png";
import PastorMichaelAgbadze from "@/../public/assets/img/church_leaders/PastorMicahelAgbadze.png";
import chiefElderRapheal from "@/../public/assets/img/church_leaders/chiefElderRapheal.png";

// TypeScript interfaces
interface Pastor {
  name: string;
  photo: string;
}

interface ServiceTime {
  time: string;
}

interface SundayServices {
  morning?: ServiceTime | null;
  afternoon?: ServiceTime | null;
  evening?: ServiceTime | null;
}

interface Services {
  tuesday?: ServiceTime | null;
  thursday?: ServiceTime | null;
  friday?: ServiceTime | null;
  sunday: SundayServices;
}

interface Branch {
  id: number;
  name: string;
  pastor: Pastor;
  location: string;
  contact: string;
  services: Services;
}

const branchesData: Branch[] = [
  {
    id: 1,
    name: "Ho S Church",
    pastor: {
      name: "Pastor Emmanuel Fiifi Robertson",
      photo: PastorEmmanuelFiifiRobert.src,
    },
    location: "Trafalgar (Behind Supercare Specialist and Fertility Center),Ho",
    contact: "+233 59 467 2032",
    services: {
      tuesday: { time: "6:00 PM - 8:00 PM" },
      friday: { time: "6:00 PM - 8:00 PM" },
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: { time: "10:30 AM - 12:30 PM" },
        evening: { time: "6:00 PM - 8:00 PM" },
      },
    },
  },
  {
    id: 2,
    name: "Abeka S Church",
    pastor: {
      name: "Pastor Emmanuel Yartey",
      photo: PastorEmmanuelYartey.src,
    },
    location: "Abeka Free Pipe Junction",
    contact: "+233 54 957 0219",
    services: {
      tuesday: { time: "6:00 PM - 8:30 PM" },
      friday: { time: "6:00 PM - 8:30 PM" },
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: { time: "10:30 AM - 12:30 PM" },
        evening: { time: "6:00 PM - 8:30 PM" },
      },
    },
  },
  {
    id: 3,
    name: "Sowutuom F Church",
    pastor: {
      name: "Pastor Moses Frimpong Boateng",
      photo: PastorMosesFrimpong.src,
    },
    location: "Sowutuom, Adjacent Pentecost University",
    contact: "+233 59 802 3269",
    services: {
      tuesday: { time: "7:00 PM - 9:00 PM" },
      friday: { time: "6:00 PM - 8:00 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:30 AM" },
        afternoon: { time: "12:30 PM - 2:30 PM" },
        evening: null,
      },
    },
  },
  {
    id: 5,
    name: "Adabraka F Church",
    pastor: {
      name: "Pastor Michael Oduro",
      photo: PastorMichaelOduro.src,
    },
    location: "Graphic Road, Opposite First Allied Savings and Loans Limited",
    contact: "+233 24 937 7622",
    services: {
      tuesday: { time: "7:00 PM - 8:30 PM" },
      friday: { time: "7:00 PM - 8:30 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:30 AM" },
        afternoon: { time: "12:30 PM - 2:30 PM" },
        evening: null,
      },
    },
  },
  {
    id: 6,
    name: "Koforidua F Church",
    pastor: {
      name: "Chief Elder Charles Phillips Fiadjoe",
      photo: ChiefElderCharlesFiadjoe.src,
    },
    location: "Koforidua Technical University, Getfund Hall",
    contact: "+233 59 690 0722",
    services: {
      tuesday: null,
      thursday: { time: "6:00 PM - 8:00 PM" },
      friday: null,
      sunday: {
        morning: null,
        afternoon: { time: "2:00 PM - 4:30 PM" },
        evening: null,
      },
    },
  },
  {
    id: 7,
    name: "Pantang F Church",
    pastor: {
      name: "Chief Elder Prosper Asamoah Mensah",
      photo: CEElderProsperAsamoah.src,
    },
    location: "Trassaco, First Gate",
    contact: "+233 54 739 0354",
    services: {
      tuesday: { time: "6:00 PM - 8:00 PM" },
      friday: null,
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 8,
    name: "Tantra F Church",
    pastor: {
      name: "Pastor Herbert Togbe",
      photo: CEHerbertTogbey.src,
    },
    location: "Adjacent Tantra Hill Roundabout",
    contact: "+233 54 404 8436",
    services: {
      tuesday: { time: "6:00 PM - 8:30 PM" },
      friday: { time: "6:00 PM - 8:30 PM" },
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: { time: "10:40 PM - 12:30 PM" },
        evening: { time: "6:00 PM - 8:30 PM" },
      },
    },
  },
  {
    id: 20,
    name: "North Legon F Church",
    pastor: {
      name: "Chief Elder Charles Phillips Fiadjoe",
      photo: ChiefElderCharlesFiadjoe.src,
    },
    location: "Unique Citizens University College",
    contact: "+233 59 896 9708",
    services: {
      tuesday: { time: "6:30 PM - 8:30 PM" },
      friday: { time: "6:30 PM - 8:30 PM" },
      sunday: {
        morning: { time: "9:00 AM - 12:00 PM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 9,
    name: "Bole F Church",
    pastor: {
      name: "Pastor Michael Winfred Wilson Agbadze",
      photo: PastorMichaelAgbadze.src,
    },
    location: "Bole Resource Center for Ghana Federation of Disabled (P W D)",
    contact: "+233 24 094 6964",
    services: {
      tuesday: null,
      friday: { time: "7:00 PM - 8:00 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:00 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 10,
    name: "East Legon F Church",
    pastor: {
      name: "Pastor Terrick Naador",
      photo: CETerrickNaador.src,
    },
    location: "Bethel Lodge Hotel",
    contact: "+233 54 043 6862",
    services: {
      tuesday: { time: "6:00 PM - 8:30 PM" },
      friday: { time: "6:00 PM - 8:30 PM" },
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: { time: "10:40 PM - 12:30 PM" },
        evening: { time: "6:00 PM - 8:30 PM" },
      },
    },
  },
  {
    id: 11,
    name: "Kumasi F Church",
    pastor: {
      name: "Pastor Abraham Tetteh",
      photo: PastorAbrahamTetteh.src,
    },
    location: "Delisa Hostel - Ayeduase - Kumasi",
    contact: "+233 59 895 8903",
    services: {
      tuesday: { time: "7:00 PM - 9:00 PM" },
      friday: { time: "7:00 PM - 9:00 PM" },
      sunday: {
        morning: { time: "8:00 AM - 11:00 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 12,
    name: "Cape Coast F Church",
    pastor: {
      name: "Pastor Essien Oppong",
      photo: CEElderEssienNana.src,
    },
    location: "Adjacent Saabahawk Hostel - UCC",
    contact: "+233 25 711 9791",
    services: {
      tuesday: { time: "7:30 PM - 9:30 PM" },
      friday: { time: "7:30 PM - 8:30 PM" },
      sunday: {
        morning: { time: "8:30 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 13,
    name: "Winneba F Church",
    pastor: {
      name: "Pastor Vitalis Kanyei",
      photo: PastorVitalis.src,
    },
    location: "",
    contact: "+233 54 325 6343",
    services: {
      tuesday: { time: "7:30 PM - 9:30 PM" },
      friday: { time: "7:30 PM - 9:30 PM" },
      sunday: {
        morning: { time: "8:30 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 14,
    name: "UPSA F Church",
    pastor: {
      name: "Pastor Peter Hagin-Wealth",
      photo: CEPeterHaginWealth.src,
    },
    location: "Madina Akosombo Junction",
    contact: "+233 53 073 0728",
    services: {
      tuesday: { time: "7:00 PM - 9:00 PM" },
      friday: { time: "6:30 PM - 8:30 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:00 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 15,
    name: "Haatso F Church",
    pastor: {
      name: "Pastor Frederick Agyemang",
      photo: CEFredAgyemang.src,
    },
    location: "Haatso-Atomic Main Road",
    contact: "+233 59 896 9699",
    services: {
      tuesday: { time: "7:00 PM - 9:00 PM" },
      friday: { time: "7:00 PM - 9:00 PM" },
      sunday: {
        morning: { time: "9:00 AM - 12:00 PM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 16,
    name: "Korle-Bu F Church",
    pastor: {
      name: "Pastor Charles Yekple ",
      photo: PastorCharles.src,
    },
    location: "Korle-Bu (Plaza opp. Ndafa Park",
    contact: "+233 079 0930",
    services: {
      tuesday: null,
      friday: { time: "7:00 PM - 8:00 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:00 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 17,
    name: "Tema F Church",
    pastor: {
      name: "Pastor Benjamin Quayson",
      photo: PastorBenjaminQuayson.src,
    },
    location: "Community 4, Near passport office",
    contact: "+233 24 563 3885",
    services: {
      tuesday: { time: "7:00 PM - 9:000 PM" },
      friday: { time: "7:00 PM - 9:00 PM" },
      sunday: {
        morning: { time: "8:30 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 18,
    name: "Abelenkpe F Church",
    pastor: {
      name: "Pastor Kingsley Tetteh",
      photo: ShepherdKingsleyTetteh.src,
    },
    contact: "+ 233 54 475 1612",
    location: "Abelenkpe Taxi Rank",
    services: {
      tuesday: { time: "7:00 PM - 9:00 PM" },
      friday: { time: "7:00 PM - 9:00 PM" },
      sunday: {
        morning: { time: "9:00 AM - 11:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 5,
    name: "Legon F Church",
    pastor: {
      name: "Elder Raphael Addai",
      photo: chiefElderRapheal.src,
    },
    location: "Legon Main Campus",
    contact: "+233 24 678 9543",
    services: {
      tuesday: { time: "7:30 PM - 9:30 PM" },
      friday: null,
      sunday: {
        morning: { time: "8:30 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
  {
    id: 19,
    name: "Sunyani F Church",
    pastor: {
      name: "Pastor Frank Tetteh",
      photo: FrankTettehJunior.src,
    },
    location:
      " Executive Guest House (Opposite De-Ventas Hostel, Adjacent St. Vitus School)",
    contact: "+233 24 152 2989",
    services: {
      tuesday: { time: "6:00 PM - 8:30 PM" },
      friday: { time: "6:00 PM - 8:30 PM" },
      sunday: {
        morning: { time: "8:00 AM - 10:30 AM" },
        afternoon: null,
        evening: null,
      },
    },
  },
];

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<"all" | "tuesday" | "friday" | "sunday">("all");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const filteredBranches = branchesData.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.pastor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (serviceFilter === "all") return matchesSearch;
    if (serviceFilter === "tuesday")
      return matchesSearch && branch.services.tuesday;
    if (serviceFilter === "friday")
      return matchesSearch && branch.services.friday;
    if (serviceFilter === "sunday") {
      return (
        matchesSearch &&
        (branch.services.sunday.morning ||
          branch.services.sunday.afternoon ||
          branch.services.sunday.evening)
      );
    }
    return matchesSearch;
  });

  const branchesPerPage = 9;
  const totalPages = Math.ceil(filteredBranches.length / branchesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const startIndex = currentPage * branchesPerPage;
  const endIndex = startIndex + branchesPerPage;
  const visibleBranches = filteredBranches.slice(startIndex, endIndex);

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#121212] min-h-screen flex flex-col items-center justify-center px-3 md:px-6 py-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
      </div>

      {/* Title Section */}
      <div className="w-full max-w-6xl text-center md:text-left mb-8">
        <div className="flex items-center justify-center md:justify-start mb-3">
          <div className="h-0.5 w-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-3"></div>
          <span className="text-amber-400 uppercase tracking-wider text-xs font-medium">
            Find Your Community
          </span>
        </div>

        <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-white">
          Our Branch Churches
        </h1>

        <p className="text-amber-100/70 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
          Find a branch near you and join us for worship. Our branches are
          located throughout the city to serve you better.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="w-full max-w-6xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by branch name, pastor, or location..."
              className="w-full px-10 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Custom Tabs */}
          <div className="w-full md:w-auto">
            <div className="flex rounded-md overflow-hidden border border-white/10 shadow-sm backdrop-blur-sm">
              {(["all", "tuesday", "friday", "sunday"] as const).map((filter) => (
                <button
                  key={filter}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                    serviceFilter === filter
                      ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                      : "bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                  onClick={() => setServiceFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards Carousel */}
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Branch Locations</h2>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
              aria-label="Previous branches"
            >
              <ChevronLeft className="text-white text-xs" size={16} />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
              aria-label="Next branches"
            >
              <ChevronRight className="text-white text-xs" size={16} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(0)` }}
          >
            {visibleBranches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {visibleBranches.map((branch) => (
                  <div
                    key={branch.id}
                    className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-white/10 group hover:border-amber-500/30 cursor-pointer"
                    onClick={() => handleBranchClick(branch)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#19222d] flex-shrink-0">
                          <img
                            src={branch.pastor.photo}
                            alt={branch.pastor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-bold">
                            {branch.name}
                          </h3>
                          <p className="text-amber-200/80 text-xs mt-0.5">
                            {branch.pastor.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">
                          {branch.location || "Location not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full">
                <p className="text-amber-400">
                  No branches found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentPage === index ? "bg-amber-500" : "bg-white/30"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedBranch && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-[#121212] p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">
                {selectedBranch.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close modal"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-amber-100/70 text-sm mb-4">
                    Led by {selectedBranch.pastor.name}, our{" "}
                    {selectedBranch.name} is dedicated to serving the community
                    with love and compassion.
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPinned className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-amber-400 text-xs font-medium mb-1">
                          Location
                        </h4>
                        <p className="text-white text-sm">
                          {selectedBranch.location || "Location not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-amber-400 text-xs font-medium mb-1">
                          Pastor
                        </h4>
                        <p className="text-white text-sm">
                          {selectedBranch.pastor.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-amber-400 text-xs font-medium mb-1">
                          Contact
                        </h4>
                        <p className="text-white text-sm">
                          {selectedBranch.contact ||
                            "No contact information available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-start gap-3 mb-2">
                      <Clock className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <h4 className="text-amber-400 text-sm font-medium">
                        Service Schedule
                      </h4>
                    </div>

                    <div className="space-y-2 pl-8">
                      {selectedBranch.services.tuesday ? (
                        <div className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                          <p className="text-white text-sm">
                            <span className="font-medium">Tuesday:</span>{" "}
                            {selectedBranch.services.tuesday.time}
                          </p>
                        </div>
                      ) : null}

                      {selectedBranch.services.friday ? (
                        <div className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                          <p className="text-white text-sm">
                            <span className="font-medium">Friday:</span>{" "}
                            {selectedBranch.services.friday.time}
                          </p>
                        </div>
                      ) : null}

                      {selectedBranch.services.sunday.morning && (
                        <div className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                          <p className="text-white text-sm">
                            <span className="font-medium">Sunday Morning:</span>{" "}
                            {selectedBranch.services.sunday.morning.time}
                          </p>
                        </div>
                      )}

                      {selectedBranch.services.sunday.afternoon && (
                        <div className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                          <p className="text-white text-sm">
                            <span className="font-medium">
                              Sunday Afternoon:
                            </span>{" "}
                            {selectedBranch.services.sunday.afternoon.time}
                          </p>
                        </div>
                      )}

                      {selectedBranch.services.sunday.evening && (
                        <div className="flex items-center">
                          <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                          <p className="text-white text-sm">
                            <span className="font-medium">Sunday Evening:</span>{" "}
                            {selectedBranch.services.sunday.evening.time}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedBranch.contact && (
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${selectedBranch.contact}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-xs rounded-full transition-colors"
                      >
                        <span>Call Branch</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center">
                  <div className="relative max-w-[250px]">
                    <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-lg blur-lg opacity-70"></div>
                    <img
                      src={selectedBranch.pastor.photo.src}
                      alt={selectedBranch.pastor.name}
                      className="relative z-10 rounded-lg shadow-xl max-h-[300px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
