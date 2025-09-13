"use client";
import { useState, useEffect } from "react";
import { Bell, User, LogOut, Settings, ChevronDown, Menu } from "lucide-react";
import { authService } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User as FirebaseUser } from "firebase/auth";

interface HeaderProps {
  activeTab: string;
  onMenuToggle?: () => void; // For mobile menu toggle
}

export default function Header({ activeTab, onMenuToggle }: HeaderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user: FirebaseUser | null) => {
      setUser(user);
      setIsLoading(false);
      if (!user) router.push("/signin");
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayName = (): string => {
    if (!user) return "User";
    return user.displayName || user.email?.split("@")[0] || "User";
  };

  const getInitials = (): string => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="p-1 text-emerald-700 sm:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-emerald-900 capitalize">{activeTab}</h1>
            <p className="text-emerald-700 text-xs">Loading...</p>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="p-1 text-emerald-700 sm:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-emerald-900 capitalize line-clamp-1">{activeTab}</h1>
          <p className="text-emerald-700 text-xs line-clamp-1">
            Hi, {getDisplayName()}
          </p>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications - Mobile optimized */}
        <button 
          className="relative p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile Dropdown - Mobile optimized */}
        <div className="relative profile-dropdown">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 p-1 hover:bg-emerald-100 rounded-full transition-colors"
            aria-label="Profile menu"
          >
            {user?.photoURL ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-medium text-xs">{getInitials()}</span>
              </div>
            )}
            <ChevronDown
              className={`w-4 h-4 text-emerald-700 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu - Mobile optimized */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-emerald-100 py-1 z-50">
              <div className="px-3 py-2 border-b border-emerald-100">
                <p className="font-medium text-emerald-900 truncate text-sm">{getDisplayName()}</p>
                <p className="text-xs text-emerald-600 truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <hr className="my-1 border-emerald-100" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}