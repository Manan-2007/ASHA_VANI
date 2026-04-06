import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 mt-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="bg-stone-200/40 h-[1px] w-full mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-primary font-headline font-extrabold tracking-tighter text-xl">
            <img
              alt="ASHA VANI Logo"
              className="h-12 w-auto object-contain"
              src={logo}
            />
          </div>
          <div className="font-body text-sm text-stone-500 text-center md:text-left">
            © 2026 ASHA VANI. The Digital Sanctuary for Healthcare.
          </div>

        </div>
      </div>
    </footer>
  );
}
