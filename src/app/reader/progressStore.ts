import { create } from 'zustand';

type State = {
  total: number;
  completed: number;
};

type Actions = {
  reset: () => void;
  addTotal: (total: number) => void;
  addCompleted: (completed: number) => void;
};

export const useProgressStore = create<State & Actions>((set) => ({
  total: 0,
  completed: 0,
  reset: () => set(() => ({ total: 0, completed: 0 })),
  addTotal: (total) => set((state) => ({ total: state.total + total })),
  addCompleted: (completed) => set((state) => ({ completed: state.completed + completed })),
}));
