import { Settings } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function SettingsTab() {
  return (
    <ComingSoon
      icon={<Settings className="w-12 h-12 text-emerald-400 mb-4" />}
      title="Settings"
      message="Settings panel coming soon"
    />
  );
}