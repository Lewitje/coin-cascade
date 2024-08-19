import { create } from 'zustand'

const useStore = create((set) => ({
  transactions: [],
  stocks: [],
  value: 0,
  cash: 10,
  addTransaction: (newTransaction) => set((state) => ({ transactions: [ ...state.transactions, newTransaction ] })),
  updateStocks: (newStocks) => set(() => ({ stocks: newStocks })),
  sell: (inc) => set((state) => (() => ({ value: state.value + inc }))),
  setValue: (val) => set(() => ({ value: val })),
  setCash: (cash) => set(() => ({ cash: cash })),
}))

export default useStore