import { create } from 'zustand';

interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  onOpen: (movieId: string) => void;
  onClose: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  onOpen: (movieId: string) => set({ isOpen: true, movieId }),
  onClose: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
