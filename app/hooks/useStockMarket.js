import { useEffect, useRef } from "react";
import { addDays, startOfDay } from "date-fns";

import useMarketStore from "../stores/marketStore";

export default function useStockMarket () {
    const timer = useRef()
    const updateStocks = useMarketStore((state) => state.updateStocks)
    const addStockChange = useMarketStore((state) => state.addStockChange)
    const increaseTick = useMarketStore((state) => state.increaseTick)

    const changeStocks = (timeModifier) => {
        // console.log('Change all stocks')
        const currentStocks = useMarketStore.getState().stocks
        const currentBuff = useMarketStore.getState().activeBuff
        const currentTick = useMarketStore.getState().tick

        let date = addDays(startOfDay(new Date()), currentTick)

        if (timeModifier) {
            date -= 20000 * timeModifier
        }

        const newStocks = []
        
        for (const stock of currentStocks) {
            let startNumber = -10

            const hasModifier = currentBuff && stock.name === currentBuff.stockName

            if (hasModifier) {
                startNumber += currentBuff.modifier
                console.log('STOCK MODIFIER', stock.name, stock.modifier, startNumber)
            }

            if (!hasModifier && Math.random() < 0.05) {
                startNumber = startNumber * 10
            }

            let change = Number(((startNumber + (20 * Math.random())) / 500).toFixed(3))

            if (!hasModifier && Math.random() < 0.2) {
                change = 0
            }

            let newPrice = Number((stock.latest * (1 + change)).toFixed(6))
            newPrice = Math.max(0.000001, newPrice) // Make sure price is above 0
            // console.log('Calculate stock', { change, latest: stock.latest, new: newPrice })

            // console.log('Change stock', stock.name, change)
            addStockChange({ stock: stock.name, price: newPrice, change: Number(change), date })
            newStocks.push({ ...stock, latest: Number(newPrice)  })
        }

        updateStocks(newStocks)
        increaseTick()
    }

    const startStockTimer = () => {
        changeStocks()

        clearInterval(timer.current)

        timer.current = setInterval(() => {
            changeStocks()
        }, 2000)
    }

    const calculateHistory = () => {
        for (let i = 200; i > 1; i--) {
            changeStocks(i)
        }

        startStockTimer()
    }

    useEffect(() => {
        calculateHistory()

        return () => {
            clearInterval(timer.current)
        }
    }, [])
}