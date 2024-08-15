import styles from './stock.module.css'
import useMarketStore from '../stores/marketStore'
import { useMemo } from 'react'

import StockChange from './stockChange'
import StockPrice from './stockPrice'
import StockImage from './stockImage'

export default function Stock ({ stock, onOpen }) {

    const transactions = useMarketStore((state) => state.stockChanges)

    // console.log(transactions)

    const latestTransaction = useMemo(() => {
        const filtered = transactions.filter((o) => o.stock === stock.name)
        return filtered[filtered.length - 1]
    }, [ transactions, stock ])

    return (
        <div className={styles.wrapper} onClick={onOpen}>
            <div className={ styles.column }>
                <StockImage stockName={stock.name} size={24} />
                { stock.name }
            </div>
            <div className={ styles.column }>
                Details:
                <StockPrice price={stock.latest} />
                <StockChange change={latestTransaction?.change} />
            </div>
            <div className={ styles.column }>
                Portfolio:
                <StockPrice price={0} />
                <StockChange change={0} />
            </div>
            <div className={ styles.column }>
                <button>TRADE</button>
            </div>
        </div>
    )
}