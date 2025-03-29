import { create } from 'zustand'
import { CounterStore } from './types/store.types'

export const useStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () =>
    set((state: { count: number }) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));


