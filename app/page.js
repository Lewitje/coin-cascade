'use client'

import clsx from "clsx";
import styles from "./page.module.css";
import { useState } from "react";

import useMarketStore from "./stores/marketStore";
import useStockMarket from "./hooks/useStockMarket";

import Stock from "./components/stock";
import StockInfo from "./components/stockInfo";
import News from "./components/news";

export default function Home() {
	const stocks = useMarketStore((state) => state.stocks)
	const [ focusedStock, setFocusedStock ] = useState(false)

	useStockMarket()

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<div className={clsx([ styles.section, styles.sectionPortfolio ])}>
					PORTFOLIO
				</div>
				<div className={clsx([ styles.section, styles.sectionStats ])}>
					<News />
				</div>
				<div className={clsx([ styles.section, styles.sectionStocks ])}>
					{
						stocks.map((stock) => <Stock stock={stock} key={stock.name} onOpen={() => setFocusedStock(stock)} />)
					}
				</div>
				<div className={clsx([ styles.section, styles.sectionTrade ])}>
					TRADE
				</div>
			</div>

			{
				focusedStock &&
				<StockInfo stock={focusedStock} onClose={() => setFocusedStock(false)} />
			}
		</main>
	)
}
