import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] to-[#efe7db] relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[32rem] h-[32rem] bg-[#C8A97E] opacity-[0.15] blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[40rem] h-[40rem] bg-[#9FAFCA] opacity-[0.15] blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[24rem] h-[24rem] bg-[#C8A97E] opacity-[0.10] blur-3xl rounded-full pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
