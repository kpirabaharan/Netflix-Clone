import { create } from 'zustand';

interface ModalStoreInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileMenuModal = create<ModalStoreInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMobileMenuModal;
