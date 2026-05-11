import Link from "next/link";

import {
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

import {
  IoCall,
} from "react-icons/io5";

export default function FloatingSocials() {

  return (

    <div className="fixed right-5 bottom-6 z-[60] flex flex-col gap-3">

      {/* WHATSAPP */}

      <Link
        href="https://wa.me/918492939394"
        target="_blank"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >

        <FaWhatsapp size={26} />

      </Link>

      {/* INSTAGRAM */}

      <Link
        href="https://instagram.com/justtheroutes"
        target="_blank"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >

        <FaInstagram size={24} />

      </Link>

      {/* CALL */}

      <Link
        href="tel:+918492939394"
        className="w-14 h-14 rounded-full bg-[#1F3A32] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >

        <IoCall size={23} />

      </Link>

    </div>
  );
}