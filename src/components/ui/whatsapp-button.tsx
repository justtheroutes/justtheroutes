"use client";

import { MessageCircle } from "lucide-react";

import { getWhatsappLink } from "@/utils/whatsapp";

export default function WhatsappButton() {
  return (
    <a
      href={getWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
    >

      <MessageCircle size={28} />

    </a>
  );
}