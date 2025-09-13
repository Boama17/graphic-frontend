import React from "react";

export default function ComingSoon({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  return (
    <div className="bg-white/90 rounded-2xl shadow border border-emerald-100 p-12 flex flex-col items-center justify-center min-h-[300px]">
      {icon}
      <h3 className="text-lg font-semibold text-emerald-900 mb-2">{title}</h3>
      <p className="text-emerald-700">{message}</p>
    </div>
  );
}