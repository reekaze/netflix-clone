import { create } from "zustand";

type InfoModalStore = {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
};

const useInfoModal = create<InfoModalStore>((set) => ({
  movieId: "",
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () =>
    set({
      isOpen: false,
      movieId: "",
    }),
}));

export default useInfoModal;
