import Image from "next/image";

export default function StockImage ({ stockName, size }) {
    return (
        <Image src={`/coins/${stockName}.png`} width={size ? size : 48} height={size ? size : 48} alt="Coin image" />
    )
}