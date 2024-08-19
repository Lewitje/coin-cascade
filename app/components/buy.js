import { useEffect, useMemo, useRef, useState } from 'react'
import useMarketStore from '../stores/marketStore'
import usePortfolioStore from '../stores/portfolioStore'
import styles from './buy.module.css'
import _ from 'lodash'

import Button from './button'
import StockPrice from './stockPrice'
import { animate } from 'framer-motion'
import StockImage from './stockImage'
import Error from './error'

export default function Buy ({ stockName }) {
    const stock = useMarketStore((state) => state.stocks.find((o) => o.name === stockName))
    const cash = usePortfolioStore((state) => state.cash)

    const addTransaction = usePortfolioStore((state) => state.addTransaction)
    const setCash = usePortfolioStore((state) => state.setCash)
    const myStocks = usePortfolioStore((state) => state.stocks)
    const updateStocks = usePortfolioStore((state) => state.updateStocks)

    const [ total, setTotal ] = useState(1)
    const [ lockedPrice, setLockedPrice ] = useState(0)
    const [ timeLeft, setTimeLeft ] = useState(0)
    const [ priceLocked, setPriceLocked ] = useState(false)

    const lockInPrice = () => {
        if (priceLocked) {
            return
        }

        setLockedPrice(stock.latest)

        animate(15, 0, {
            duration: 15,
            ease: 'linear',
            onUpdate: (latest) => setTimeLeft(Number((latest).toFixed(1)))
        })
        .then(() => {
            setPriceLocked(false)
        })
    }

    const sharesForTotal = useMemo(() => {
        return Number((total / lockedPrice).toFixed(6))
    }, [ lockedPrice, total ])
    
    const gasFeeForTotal = useMemo(() => {
        return 1 + Number((total * stock.gas).toFixed(2))
    }, [ total, stock ])

    const max = useMemo(() => {
        return cash - gasFeeForTotal
    }, [ stock, cash ])

    const notEnoughMoney = useMemo(() => {
        return total + gasFeeForTotal > cash
    }, [ cash, lockedPrice ])

    const buy = () => {
        console.log('BUY', cash, total, cash - total, lockedPrice)
        const totalCost = gasFeeForTotal + total
        setCash(Number((cash - totalCost).toFixed(2)))
        addTransaction({ type: 'BUY', stockName, shares: sharesForTotal, price: lockedPrice })

        // Update my stocks
        const newStocks = _.cloneDeep(myStocks)
        const currentStock = newStocks.find((o) => o.stockName === stockName)
        const newStockIndex = _.findIndex(newStocks, (o) => o.stockName === stockName)

        if (currentStock) {
            currentStock.shares += sharesForTotal
            newStocks[newStockIndex] = currentStock
            updateStocks(newStocks)
        } else {
            newStocks.push({ stockName: stockName, shares: sharesForTotal })
            updateStocks(newStocks)
        }
    }

    useEffect(() => {
        lockInPrice()
    }, [])

    return (
        <div>
            <StockImage stockName={stock.name} size={80} />
            <h1>
                Buy { stock.name }
            </h1>

            <hr/>

            <h3>
                Your cash: <StockPrice price={cash} />
            </h3>

            <h3>
                Locked at <StockPrice price={lockedPrice} />
            </h3>

            <hr />

            <h1>
                ${ total }
            </h1>
            <p>
                = { sharesForTotal } {stock.name}
            </p>
            <input type="range" min={1} step={1} max={max} onChange={(e) => setTotal(Number(e.target.value))} value={total} />

            <Button label="MAX" onPress={() => setTotal(max)} />
            

            <p>
                ${total}<br/>
                + Platform fee = $1<br/>
                + Gas fee = ${ (total * stock.gas).toFixed(2) } ({ stock.gas * 100 }%)
            </p>
            <h2>
                Total cost: ${ (total + gasFeeForTotal).toFixed(2) }
            </h2>

            <hr />

            {
                notEnoughMoney &&
                <Error>
                    Insufficient funds
                </Error>
            }

            <Button
                label={`Buy ${timeLeft}`}
                onPress={buy}
                disabled={timeLeft === 0 || notEnoughMoney} />

            {
                timeLeft === 0 &&
                <Button
                    label={`Get new price`}
                    onPress={lockInPrice} />
            }
        </div>
    )
}