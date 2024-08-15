import { create } from 'zustand'

const useStore = create((set) => ({
  xp: 1,
  xddXp: () => set((state) => ((inc) => ({ xp: state.xp + inc }))),
}))

export default useStore