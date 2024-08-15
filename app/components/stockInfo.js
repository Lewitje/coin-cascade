import { useMemo, useState } from 'react'
import useStore from '../stores/marketStore'
import styles from './stockInfo.module.css'

import StockChange from './stockChange'
import StockPrice from './stockPrice'
import StockImage from './stockImage'
import StockBuySell from './stockBuySell'

import { Chart } from 'react-charts'

export default function StockInfo ({ stockName, onClose }) {
    const latest = useStore((state) => state.stocks.find((o) => o.name === stockName ))
    const transactions = useStore((state) => state.stockChanges.filter((o) => o.stock === stockName))
    const [ transactionAmount, setTransactionAmount ] = useState(30)

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
            getValue: datum => datum.price
          }
        ],
        []
      )

    if (!latest) {
        return
    }

    return (
        <div className={styles.inner}>
            <StockImage stockName={latest.name} size={80} />

            <div className={styles.info}>
                <div>
                    <h3>
                        { latest.name }
                    </h3>

                    <h1 style={{ margin: '4px 0 8px' }}>
                        <StockPrice price={latest.latest} />
                    </h1>

                    <div>
                        <StockChange change={latestTransaction?.change} />

                        <StockBuySell stockName={stockName} />
                    </div>
                </div>

                {/* <button onClick={() => setTransactionAmount(7)}>
                    7 days
                </button>

                <button onClick={() => setTransactionAmount(30)}>
                    30 days
                </button>

                <button onClick={() => setTransactionAmount(90)}>
                    90 days
                </button>

                <button onClick={() => setTransactionAmount(180)}>
                    180 days
                </button> */}
            </div>

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
        </div>
    )
}