import { useState, useEffect } from 'react'
import { animate } from 'framer-motion'
import clsx from 'clsx'
import styles from './stockChange.module.css'
import Image from 'next/image'

export default function StockChange ({ change }) {

    const [ oldPrice, setOldPrice ] = useState(0)
    const [ newPrice, setNewPrice ] = useState(0)

    useEffect(() => {
        if (isNaN(change)) {
            return
        }

        animate(oldPrice, change, {
            onUpdate: latest => setNewPrice((Math.abs(latest) * 100).toFixed(2)),
            duration: 0.5
        })
        .then(() => {
            setOldPrice(change)
        })
    }, [ change ])

    return (
        <span className={clsx([ 'price', styles.wrapper, change < 0 && styles.negative, change > 0 && styles.positive ])}>
            {
                change > 0 ?
                <Image src="/icons/increase.svg" width={16} height={16} alt="Inc" />
                : change < 0 ?
                <Image src="/icons/decrease.svg" width={16} height={16} alt="Dec" />
                :
                <Image src="/icons/stable.svg" width={16} height={16} alt="Stable" />
            }
            { newPrice }%
        </span>
    )
}