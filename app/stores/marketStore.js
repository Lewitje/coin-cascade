import { create } from 'zustand'

const useStore = create((set) => ({
  stocks: [
    { name: 'LewiCoin', price: 0.053, latest: 0.053, gas: 0.05 },
    { name: 'IvoGems', price: 1.012, latest: 1.012, gas: 0.02 },
    { name: 'KygoInu', price: 0.022, latest: 0.22, gas: 0.03 },
    { name: 'MobyMoolah', price: 0.23, latest: 0.23, gas: 0.03 },
    { name: 'NibblerNuggets', price: 1.02, latest: 1.02, gas: 0.02 },
    { name: 'HypnoCoin', price: 3.42, latest: 3.42, gas: 0.01 },
    { name: 'Wall-Eth', price: 10.65, latest: 10.65, gas: 0.04 },
    { name: 'EveBits', price: 4.76, latest: 4.76, gas: 0.02 },
    { name: 'AstroBolts', price: 2.094, latest: 2.094, gas: 0.02 },
    { name: 'OchanomizuCoin', price: 1.0083, latest: 1.0083, gas: 0.03 },
    { name: 'KoopaCoin', price: 0.55, latest: 0.55, gas: 0.01 },
    { name: 'YoshiYen', price: 0.89, latest: 0.89, gas: 0.02 },
    { name: 'KrustyCash', price: 6.44, latest: 6.44, gas: 0.04 },
    { name: 'DuffCoin', price: 1.32, latest: 1.32, gas: 0.02 },
    { name: 'SchwiftyCoin', price: 0.65, latest: 0.65, gas: 0.03 },
    { name: 'PlumbusCash', price: 0.48, latest: 0.48, gas: 0.04 },
    { name: 'WookieeWealth', price: 0.089, latest: 0.089, gas: 0.05 },
    { name: 'DroidDosh', price: 0.86, latest: 0.86, gas: 0.02 }
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