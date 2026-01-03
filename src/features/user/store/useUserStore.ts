import { create } from 'zustand';
import type { User } from '../schema/user.interface';

interface UserUIState {
  selectedUser: User | null;
  isModalOpen: boolean;
  setSelectedUser: (user: User | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useUserStore = create<UserUIState>((set) => ({
  selectedUser: null,
  isModalOpen: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedUser: null }),
}));