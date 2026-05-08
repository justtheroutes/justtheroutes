"use client";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 md:p-10 luxury-shadow">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-black/50 hover:text-black transition"
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  );
}