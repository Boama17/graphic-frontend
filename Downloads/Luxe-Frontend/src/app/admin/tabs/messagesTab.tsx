import { MessageSquare } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

export default function MessagesTab() {
  return (
    <ComingSoon
      icon={<MessageSquare className="w-12 h-12 text-emerald-400 mb-4" />}
      title="Messages"
      message="Message management coming soon"
    />
  );
}