'use client'

import clsx from "clsx";
import styles from "./page.module.css";
import { useState } from "react";

import useMarketStore from "./stores/marketStore";
import useStockMarket from "./hooks/useStockMarket";

import Stock from "./components/stock";
import StockInfo from "./components/stockInfo";
import News from "./components/news";
import Portfolio from "./components/portfolio";
import Filter from "./components/filter";

export default function Home() {
	const [ focusedStock, setFocusedStock ] = useState(false)
	const [ filteredStocks, setFilteredStocks ] = useState([])
	const stocks = useMarketStore((state) => state.stocks.filter((o) => filteredStocks.includes(o.name)))

	useStockMarket()

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<div className={clsx([ styles.section, styles.sectionPortfolio ])}>
					<Portfolio />
				</div>
				<div className={clsx([ styles.section, styles.sectionStats ])}>
					<News onOpenStock={setFocusedStock} />
				</div>
				<div className={clsx([ styles.section, styles.sectionStocks ])}>
					<Filter onChange={(o) => setFilteredStocks(o)} />
					{
						stocks.map((stock) => <Stock stock={stock} key={stock.name} onOpen={() => setFocusedStock(stock.name)} />)
					}
				</div>
				<div className={clsx([ styles.section, styles.sectionTrade ])}>
					{
						focusedStock &&
						<StockInfo key={focusedStock} stockName={focusedStock} onClose={() => setFocusedStock(false)} />
					}
				</div>
			</div>

		</main>
	)
}
