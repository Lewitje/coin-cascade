import { animate } from "framer-motion"
import { useEffect, useState } from "react"

export default function StockPrice ({ price }) {

    const [ oldPrice, setOldPrice ] = useState(0)
    const [ newPrice, setNewPrice ] = useState(0)

    useEffect(() => {
        animate(oldPrice, price, {
            onUpdate: latest => setNewPrice(Number(latest.toFixed(6))),
            duration: 0.5
        })
        .then(() => {
            console.log('DONE')
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