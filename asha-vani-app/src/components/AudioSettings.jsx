import { useState } from "react";

export default function AudioSettings() {
  const [micEnabled, setMicEnabled] = useState(true);
  const [inputDevice, setInputDevice] = useState("default");
  const [volume, setVolume] = useState(70);

  return (
    <div className="mt-8 px-8 flex-shrink-0">
      <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">
        Audio Settings
      </h3>

      <div className="bg-surface-lowest rounded-2xl p-4 border border-outline-variant/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col space-y-5 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />

        {/* Microphone Toggle */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">
              {micEnabled ? "mic" : "mic_off"}
            </span>
            <span className="text-[13px] font-semibold">Microphone</span>
          </div>
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ease-in-out focus:outline-none shadow-inner ${
              micEnabled ? "bg-primary" : "bg-outline-variant/40"
            }`}
            aria-label="Toggle Microphone"
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform duration-300 ease-in-out shadow-sm ${
                micEnabled ? "translate-x-[22px]" : "translate-x-[2px]"
              }`}
            />
          </button>
        </div>

        {/* Input Device Selector */}
        <div className="flex flex-col space-y-2 relative z-10">
          <label className="text-[10px] font-bold text-outline tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">
              settings_input_component
            </span>
            Input Device
          </label>
          <div className="relative">
            <select
              value={inputDevice}
              onChange={(e) => setInputDevice(e.target.value)}
              className="w-full appearance-none bg-surface-low border border-outline-variant/20 rounded-lg px-3 py-2.5 text-[12px] font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
            >
              <option value="default">Default Microphone</option>
              <option value="external">External Mic</option>
              <option value="usb">USB Mic</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* TTS Volume Control */}
        <div className="flex flex-col space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-outline tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">
                {volume > 50 ? "volume_up" : volume > 0 ? "volume_down" : "volume_off"}
              </span>
              Voice Output Vol
            </label>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              {volume}%
            </span>
          </div>
          
          <div className="relative w-full flex items-center h-2">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer relative z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-outline-variant/20"
            />
            {/* Custom Track Background */}
            <div className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 rounded-full bg-outline-variant/20 z-0 overflow-hidden">
               {/* Filled portion of the track */}
               <div 
                 className="h-full bg-primary rounded-full transition-all duration-75"
                 style={{ width: `${volume}%` }}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
