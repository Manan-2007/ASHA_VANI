import { useState } from "react";

const languages = [
  { id: "hinglish", label: "Hindi / English", enabled: true },
  { id: "meghalaya", label: "Meghalaya Language", enabled: false },
  { id: "rajasthan", label: "Rajasthan Language", enabled: false },

];

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("hinglish");

  return (
    <div className="mt-8 px-8">
      <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">
        Languages
      </h3>
      <div className="flex flex-col space-y-1.5">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => {
                if (lang.enabled) setSelectedLanguage(lang.id);
              }}
              disabled={!lang.enabled}
              aria-disabled={!lang.enabled}
              className={`flex flex-col text-left px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${isSelected
                ? "bg-surface-lowest shadow-sm border border-outline-variant/10"
                : "bg-transparent border border-transparent"
                } ${!lang.enabled
                  ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                  : "cursor-pointer hover:bg-surface-lowest/50"
                }`}
            >
              <span
                className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-on-surface-variant"
                  }`}
              >
                {lang.label}
              </span>

              {!lang.enabled && (
                <span className="text-[10px] text-outline mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 left-2 bg-surface text-on-surface px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
                  Coming soon — part of future scope
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
