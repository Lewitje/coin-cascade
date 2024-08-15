import { useEffect, useRef } from "react";

import useMarketStore from "../stores/marketStore";

export default function useStockMarket () {
    const timer = useRef()
    const updateStocks = useMarketStore((state) => state.updateStocks)
    const addStockChange = useMarketStore((state) => state.addStockChange)

    const changeStocks = (timeModifier) => {
        // console.log('Change all stocks')
        const currentStocks = useMarketStore.getState().stocks

        let date = new Date().getTime()

        if (timeModifier) {
            date -= 20000 * timeModifier
        }

        const newStocks = []
        
        for (const stock of currentStocks) {
            let change = Number(((-10 + (20 * Math.random())) / 500).toFixed(3))

            if (Math.random() < 0.4) {
                change = 0
            }

            const newPrice = Number((stock.latest * (1 + change)).toFixed(6))

            // console.log('Calculate stock', { change, latest: stock.latest, new: newPrice })

            // console.log('Change stock', stock.name, change)
            addStockChange({ stock: stock.name, price: newPrice, change: Number(change), date })
            newStocks.push({ ...stock, latest: Number(newPrice)  })
        }

        updateStocks(newStocks)
    }

    const startStockTimer = () => {
        changeStocks()

        clearInterval(timer.current)

        timer.current = setInterval(() => {
            changeStocks()
        }, 500)
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