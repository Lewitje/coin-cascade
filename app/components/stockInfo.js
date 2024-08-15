import { useMemo, useState } from 'react'
import useStore from '../stores/marketStore'
import styles from './stockInfo.module.css'
import StockChange from './stockChange'

import { Chart } from 'react-charts'

export default function StockInfo ({ stock, onClose }) {
    const latest = useStore((state) => state.stocks.find((o) => o.name === stock.name ))
    const transactions = useStore((state) => state.stockChanges.filter((o) => o.stock === stock.name))
    const [ transactionAmount, setTransactionAmount ] = useState(50)

    const sortedTransactions = useMemo(() => {
        const sorted = transactions.sort((a, b) => a.date - b.date)
        const last = sorted.slice(-transactionAmount)
        // console.log(last.map((o) => o.change))
        return last
    }, [transactions])

    const latestTransaction = useMemo(() => {
        return sortedTransactions[sortedTransactions.length - 1]
    }, [ sortedTransactions ])

    const primaryAxis = useMemo(
        () => ({
          getValue: datum => new Date(datum.date)
        }),
        []
      )
    
      const secondaryAxes = useMemo(
        () => [
          {
            getValue: datum => datum.price,
            min: 0
          }
        ],
        []
      )

    return (
        <div className={ styles.wrapper }>
            <div className={styles.inner}>
                <h1>
                    { stock.name }
                </h1>
                <h2>
                    { latest.latest }
                </h2>

                <button onClick={onClose}>
                    Close
                </button>

                <button onClick={() => setTransactionAmount(50)}>
                    Last 50
                </button>

                <button onClick={() => setTransactionAmount(100)}>
                    Last 100
                </button>

                <button onClick={() => setTransactionAmount(500)}>
                    Last 500
                </button>

                <StockChange change={latestTransaction?.change} />

                <div className={styles.chartWrapper}>
                    {
                        transactions?.length &&
                        <Chart
                            options={{
                                dark: true,
                                primaryAxis,
                                secondaryAxes,
                                data: [
                                    {
                                        label: 'Price',
                                        data: sortedTransactions
                                    }
                                ]
                            }}
                        />
                    }
                </div>

                {
                    sortedTransactions.map((o) => (
                        <div key={o.date}>
                            { o.date } | { o.price } | { o.change }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}