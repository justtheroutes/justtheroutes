"use client";

import Button from "./button";

import { useInquiryModal } from "@/hooks/use-inquiry-modal";

export default function DestinationCTA() {
  const inquiryModal =
    useInquiryModal();

  return (
    <Button
      size="lg"
      onClick={inquiryModal.onOpen}
    >
      Plan Your Journey
    </Button>
  );
}