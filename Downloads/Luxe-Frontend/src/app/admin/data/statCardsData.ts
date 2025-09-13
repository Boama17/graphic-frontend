import { Building, Home, Users, DollarSign } from "lucide-react";

const statCards = [
  {
    title: 'Total Properties',
    value: 156,
    change: '+12%',
    icon: Building,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Active Listings',
    value: 134,
    change: '+8%',
    icon: Home,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    title: 'Total Users',
    value: 1250,
    change: '+24%',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    title: 'Monthly Revenue',
    value: `₵${(24500000 / 1000000).toFixed(1)}M`,
    change: '+15%',
    icon: DollarSign,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }
];

export default statCards;