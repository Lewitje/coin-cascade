import { useEffect, useMemo, useRef, useState } from 'react'
import useMarketStore from '../stores/marketStore'
import usePortfolioStore from '../stores/portfolioStore'
import styles from './sell.module.css'
import _ from 'lodash'

import Button from './button'
import StockPrice from './stockPrice'
import { animate } from 'framer-motion'
import StockImage from './stockImage'

export default function Sell ({ stockName }) {
    const stock = useMarketStore((state) => state.stocks.find((o) => o.name === stockName))
    const cash = usePortfolioStore((state) => state.cash)
    const myStock = usePortfolioStore((state) => state.stocks.find((o) => o.stockName === stockName))

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

    const max = useMemo(() => {
        if (!myStock?.shares) {
            return 0
        }
        return myStock.shares * lockedPrice
    }, [ stock, cash ])

    const sharesForTotal = useMemo(() => {
        return Number((total / lockedPrice).toFixed(6))
    }, [ lockedPrice, total ])

    const gasFeeForTotal = useMemo(() => {
        return 1 + Number((total * stock.gas).toFixed(2))
    }, [ total, stock ])

    const minTotal = useMemo(() => {
        return 2 + (1 * stock.gas)
    }, [ gasFeeForTotal ])

    const sell = () => {
        const totalCost = total - gasFeeForTotal
        console.log('SELL', cash, total, lockedPrice)
        setCash(Number((cash + totalCost).toFixed(2)))
        addTransaction({ type: 'SELL', stockName, shares: sharesForTotal, price: lockedPrice })

        // Update my stocks
        let newStocks = _.cloneDeep(myStocks)
        const currentStock = newStocks.find((o) => o.stockName === stockName)
        const newStockIndex = _.findIndex(newStocks, (o) => o.stockName === stockName)

        if (currentStock) {
            currentStock.shares -= sharesForTotal
            
            if (currentStock.shares === 0) {
                newStocks = newStocks.filter((o) => o.stockName !== stockName)
            } else {
                newStocks[newStockIndex] = currentStock
            }

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
                Sell { stock.name }
            </h1>

            <hr/>

            <h3>
                You own: <StockPrice price={myStock.shares * lockedPrice} />
            </h3>

            <h3>
                Locked at <StockPrice price={lockedPrice} />
            </h3>

            <hr />

            <h3>
                Sell ${total}
            </h3>
            <p>
                = {sharesForTotal} {stock.name}
            </p>
            <h3>
                GAS { stock.gas }% = ${ gasFeeForTotal }
            </h3>

            <input type="range" value={minTotal} min={minTotal} step={0.5} max={max} onChange={(e) => setTotal(Number(e.target.value))} value={total} />

            <Button label="MAX" onPress={() => setTotal(max)} />

            <p>
                + ${ total }<br/>
                - ${ gasFeeForTotal }
            </p>
            <h2>
                Total: ${ (total - gasFeeForTotal).toFixed(2) }
            </h2>

            <hr />

            <Button
                label={`Sell ${timeLeft}`}
                onPress={sell}
                disabled={timeLeft === 0} />

            {
                timeLeft === 0 &&
                <Button
                    label={`Get new price`}
                    onPress={lockInPrice} />
            }
        </div>
    )
}