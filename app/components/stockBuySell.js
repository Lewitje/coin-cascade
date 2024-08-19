import { useState } from "react"
import usePortfolioStore from '../stores/portfolioStore'

import Button from "./button"
import Popup from "./popup"
import Buy from "./buy"
import Sell from "./sell"

export default function StockBuySell ({ stockName }) {
    const myStock = usePortfolioStore((state) => state.stocks.find((o) => o.stockName === stockName))

    const [ showBuy, setShowBuy ] = useState(false)
    const [ showSell, setShowSell ] = useState(false)

    return (
        <span>
            <Button label="BUY" onPress={() => setShowBuy(true)} />
            <Button
                label="SELL"
                onPress={() => setShowSell(true)}
                disabled={!myStock} />

            {
                showBuy &&
                    <Popup onClose={() => setShowBuy(false)}>
                        <Buy stockName={stockName} />
                    </Popup>
            }

            {
                showSell &&
                    <Popup onClose={() => setShowSell(false)}>
                        <Sell stockName={stockName} />
                    </Popup>
            }
        </span>
    )
}