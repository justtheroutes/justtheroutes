import Link from "next/link";

import {
  Phone,
  Camera,
  MessageCircle,
} from "lucide-react";

export default function FloatingSocials() {
  return (
    <div className="fixed right-5 bottom-6 z-[60] flex flex-col gap-3">

      <Link
        href="https://wa.me/918491939394"
        target="_blank"
        className="w-14 h-14 rounded-full bg-[#1F3A32] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition"
      >
        <MessageCircle size={24} />
      </Link>

      <Link
        href="https://instagram.com/justtheroutes"
        target="_blank"
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-105 transition"
      >
        <Camera size={24} />
      </Link>

      <Link
        href="tel:+918491939394"
        className="w-14 h-14 rounded-full bg-[#C8A96B] text-black flex items-center justify-center shadow-2xl hover:scale-105 transition"
      >
        <Phone size={22} />
      </Link>

    </div>
  );
}