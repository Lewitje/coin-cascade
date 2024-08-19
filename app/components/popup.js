import styles from './popup.module.css'

export default function Popup ({ children, onClose }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                { children }
            </div>

            <div className={styles.close} onClick={onClose}></div>
        </div>
    )
}