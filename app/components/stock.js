import styles from './stock.module.css'
import useMarketStore from '../stores/marketStore'
import { useMemo } from 'react'
import StockChange from './stockChange'

export default function Stock ({ stock, onOpen }) {

    const transactions = useMarketStore((state) => state.stockChanges)

    // console.log(transactions)

    const latestTransaction = useMemo(() => {
        const filtered = transactions.filter((o) => o.stock === stock.name)
        return filtered[filtered.length - 1]
    }, [ transactions, stock ])

    return (
        <div className={styles.wrapper} onClick={onOpen} onKeyUp={onOpen}>
            <div className={ styles.column }>
                { stock.name }
            </div>
            <div className={ styles.column }>
                <span className="price">&#3647;{ stock.latest }</span>
            </div>
            <div className={ styles.column }>
                <StockChange change={latestTransaction?.change} />
            </div>
            <div className={ styles.column }>
                <span className="price">&#3647;{ 0 }</span>
            </div>
            <div className={ styles.column }>
                -0%
            </div>
            <div className={ styles.column }>
                <button>TRADE</button>
            </div>
        </div>
    )
}