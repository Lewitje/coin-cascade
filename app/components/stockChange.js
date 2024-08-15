import clsx from 'clsx'
import styles from './stockChange.module.css'

export default function StockChange ({ change }) {
    return (
        <span className={clsx([ 'price', styles.wrapper, change < 0 && styles.negative, change > 0 && styles.positive ])}>
            { change > 0 ? '+' : change === 0 ? '-' : null }{ change }%
        </span>
    )
}