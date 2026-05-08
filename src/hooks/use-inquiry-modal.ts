import { create } from "zustand";

type InquiryModalStore = {
  isOpen: boolean;

  onOpen: () => void;

  onClose: () => void;
};

export const useInquiryModal =
  create<InquiryModalStore>((set) => ({
    isOpen: false,

    onOpen: () =>
      set({
        isOpen: true,
      }),

    onClose: () =>
      set({
        isOpen: false,
      }),
  }));