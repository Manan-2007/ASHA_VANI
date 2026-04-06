import { useState, useEffect } from "react";
import useSystemHealth from "../hooks/useSystemHealth";

export default function NetworkStatus() {
  const health = useSystemHealth(5000);
  const isOnline = health.status === "ready";

  return (
    <div
      className={`group flex items-center gap-3 px-3 py-2 rounded-full border transition-all duration-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${isOnline
        ? "bg-[#F0FDF4] border-green-200 text-green-900" // soft green
        : "bg-surface-lowest border-outline-variant/40 text-on-surface-variant" // muted gray/brown
        }`}
    >
      {/* Icon Area */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full shadow-sm transition-colors duration-500 ${isOnline ? "bg-green-100 text-green-700" : "bg-surface-low text-outline"
          }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {isOnline ? "cloud_done" : "cloud_off"}
        </span>
      </div>

      {/* Label and Description */}
      <div className="flex flex-col pr-2">
        <span className="text-[13px] font-bold font-headline leading-none mb-0.5">
          {isOnline ? "Online Mode" : "Offline Mode"}
        </span>
        <span className="text-[10px] font-medium opacity-80 leading-none">
          {isOnline
            ? "Connected — ready to download language packs"
            : "Running fully offline"}
        </span>
      </div>

    </div>
  );
}
