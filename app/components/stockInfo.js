import { useMemo, useState } from 'react'
import useStore from '../stores/marketStore'
import styles from './stockInfo.module.css'

import StockChange from './stockChange'
import StockPrice from './stockPrice'
import StockImage from './stockImage'
import StockBuySell from './stockBuySell'
import Button from './button'

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

                <div>
                    <Button label="7d" onPress={() => setTransactionAmount(7)} />
                    <Button label="30d" onPress={() => setTransactionAmount(30)} />
                    <Button label="90d" onPress={() => setTransactionAmount(90)} />
                    <Button label="180d" onPress={() => setTransactionAmount(180)} />
                </div>
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