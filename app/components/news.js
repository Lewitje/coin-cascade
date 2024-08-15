import styles from './news.module.css'
import { motion } from 'framer-motion'

import useNews from "../hooks/useNews"

export default function News ({ onOpenStock }) {
    const news = useNews()

    return (
        <div className={styles.wrapper} onClick={() => onOpenStock(news?.stockName)} key={news.stockName}>

            <div className={ styles.liveWrapper }>
                <div className={ styles.liveIndicator } />
                LIVE
            </div>

            <motion.div
                initial={{ translateX: 40, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                className={styles.message}>

                { news?.message }

            </motion.div>

            <motion.div
                initial={{ translateX: 40, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.date}>

                { news?.date }
                
            </motion.div>
        </div>
    )
}