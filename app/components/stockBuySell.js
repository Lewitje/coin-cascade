import Button from "./button"

export default function StockBuySell ({ stockName }) {
    return (
        <span>
            <Button label="BUY" />
            <Button label="SELL" />
        </span>
    )
}