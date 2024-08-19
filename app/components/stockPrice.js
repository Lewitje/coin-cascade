import { animate } from "framer-motion"
import { max } from "lodash"
import { useEffect, useState } from "react"

export default function StockPrice ({ price, maxLength }) {
    const [ oldPrice, setOldPrice ] = useState(0)
    const [ newPrice, setNewPrice ] = useState(0)

    useEffect(() => {
        if (isNaN(price)) {
            return
        }

        let fixedLength = 6

        if (maxLength) {
            fixedLength = maxLength
        }

        animate(oldPrice, price, {
            onUpdate: latest => setNewPrice(Number(latest.toFixed(fixedLength))),
            duration: 0.5
        })
        .then(() => {
            setOldPrice(price)
        })
    }, [ price ])

    return (
        <span className="price">
            <sup style={{ letterSpacing: '-0.5em', marginRight: '0.5em' }}>&#65504;&#65504;</sup>
            { newPrice }
        </span>
    )
}