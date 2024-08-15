import { create } from 'zustand'

const useStore = create((set) => ({
  transactions: [],
  value: 0,
  cash: 10,
  addTransaction: () => set((state) => ((newTransaction) => ({ transactions: [ ...state.transactions, newTransaction ] }))),
  sell: () => set((state) => ((inc) => ({ value: state.value + inc }))),
  setValue: () => set(() => ((val) => ({ value: val }))),
  setCash: () => set(() => ((cash) => ({ cash: cash }))),
}))

export default useStore