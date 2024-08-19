import styles from './error.module.css'

export default function Error ({ children }) {
    return (
        <div className={styles.wrapper}>
            { children }
        </div>
    )
}