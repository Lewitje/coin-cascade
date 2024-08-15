import { create } from 'zustand'

const useStore = create((set) => ({
  stocks: [
    { name: 'LewiCoin', price: 0.0053, latest: 0.0053 },
    { name: 'IvoGems', price: 0.000012, latest: 0.0012 },
    { name: 'KygoInu', price: 0.0022, latest: 0.0022 },
    { name: 'MobyMoolah', price: 0.23, latest: 0.23 },
    { name: 'NibblerNuggets', price: 0.00002, latest: 0.002 },
    { name: 'HypnoCoin', price: 0.42, latest: 0.42 },
    { name: 'Wall-Eth', price: 0.00042, latest: 0.00042 },
    { name: 'EveBits', price: 0.76, latest: 0.76 },
    { name: 'AstroBolts', price: 0.094, latest: 0.094 },
    { name: 'OchanomizuCoin', price: 0.0083, latest: 0.0083 },
    { name: 'KoopaCoin', price: 0.00055, latest: 0.0055 },
    { name: 'YoshiYen', price: 0.89, latest: 0.89 },
    { name: 'KrustyCash', price: 1.44, latest: 1.44 },
    { name: 'DuffCoin', price: 0.00032, latest: 0.0032 },
    { name: 'SchwiftyCoin', price: 0.65, latest: 0.65 },
    { name: 'PlumbusCash', price: 0.48, latest: 0.48 },
    { name: 'WookieeWealth', price: 0.0089, latest: 0.0089 },
    { name: 'DroidDosh', price: 0.86, latest: 0.86 }
  ],
  stockChanges: [

  ],
  activeBuff: false,
  tick: 0,
  addStockChange: (transaction) => set((state) => ({ stockChanges: [ ...state.stockChanges, transaction ] })),
  updateStocks: (newStocks) => set(() => ({ stocks: newStocks })),
  setActiveBuff: (newBuff) => set(() => ({ activeBuff: newBuff })),
  increaseTick: () => set((state) => ({ tick: state.tick + 1 }))
}))

export default useStore