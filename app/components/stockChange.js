import clsx from 'clsx'
import styles from './stockChange.module.css'
import Image from 'next/image'

export default function StockChange ({ change }) {
    return (
        <span className={clsx([ 'price', styles.wrapper, change < 0 && styles.negative, change > 0 && styles.positive ])}>
            {
                change > 0 ?
                <Image src="/icons/increase.svg" width={16} height={16} />
                : change < 0 ?
                <Image src="/icons/decrease.svg" width={16} height={16} />
                :
                <Image src="/icons/stable.svg" width={16} height={16} />
            }
            { (Math.abs(change) * 100).toFixed(2) }%
        </span>
    )
}