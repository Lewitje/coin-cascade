import styles from './button.module.css'

export default function Button ({ label }) {
    return (
        <button className={ styles.button }>
            { label }
        </button>
    )
}