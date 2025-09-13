import { TrendingUp } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function AnalyticsTab() {
  return (
    <ComingSoon
      icon={<TrendingUp className="w-12 h-12 text-emerald-400 mb-4" />}
      title="Analytics"
      message="Analytics dashboard coming soon"
    />
  );
}