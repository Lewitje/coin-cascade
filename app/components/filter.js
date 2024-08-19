import { useEffect, useMemo, useState } from 'react'

import styles from './filter.module.css'
import useMarketStore from '../stores/marketStore'
import usePortfolioStore from '../stores/portfolioStore'

export default function Filter ({ onChange }) {
    const stocks = useMarketStore((state) => state.stocks)
    const myStocks = usePortfolioStore((state) => state.stocks)

    const [ myStocksOnly, setMyStocksOnly ] = useState(false)

    const filterStocks = () => {
        let filtered = stocks.map((o) => o.name)

        console.log('Filter change', filtered)

        if (myStocksOnly) {
            filtered = stocks.filter((stock) => myStocks.find((myStock) => stock.name === myStock.stockName)).map((o) => o.name)
        }

        onChange(filtered)
    }

    useEffect(() => {
        filterStocks()
    }, [ myStocksOnly, myStocks ])

    return (
        <div className={styles.wrapper}>
            <label>
                <input type="checkbox" value={myStocksOnly} onChange={(e) => setMyStocksOnly(!myStocksOnly)} />
                My stocks only
            </label>
        </div>
    )
}