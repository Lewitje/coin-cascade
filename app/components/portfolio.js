import styles from './portfolio.module.css'
import usePortfolioStore from '../stores/portfolioStore'
import useMarketStore from '../stores/marketStore'

import StockPrice from './stockPrice'
import { useMemo } from 'react'

export default function Portfolio () {
    const value = usePortfolioStore((state) => state.value)
    const cash = usePortfolioStore((state) => state.cash)

    const stocks = useMarketStore((state) => state.stocks)
    const myStocks = usePortfolioStore((state) => state.stocks)

    const totalValue = useMemo(() => {
        let value = 0

        if (myStocks.length === 0) {
            return value
        }

        console.log('Update portfolio total value', myStocks)

        for (const stock of myStocks) {
            const shares = stock.shares
            const currentPrice = stocks.find((o) => o.name === stock.stockName).latest

            value += currentPrice * shares
        }

        return value
    }, [ myStocks, stocks ])

    return (
        <div className={styles.wrapper}>
            <div>
                Portfolio value:<br/>
                <h1><StockPrice price={totalValue} maxLength={2} /></h1>
            </div>
            
            <div>
                Cash:<br/>
                <h3><StockPrice price={cash} maxLength={2} /></h3>
            </div>
        </div>
    )
}