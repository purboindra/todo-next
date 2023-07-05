import { create } from "zustand";

interface UseLoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<UseLoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
