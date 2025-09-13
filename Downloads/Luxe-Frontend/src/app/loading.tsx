import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-100 bg-opacity-70">
      <LoaderCircle className="animate-spin text-green-500" size={64} />
    </div>
  );
}