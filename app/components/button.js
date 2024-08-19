import styles from './button.module.css'

export default function Button ({ label, onPress, disabled }) {
    return (
        <button type="button" className={ styles.button } onClick={onPress} onKeyUp={onPress} disabled={disabled}>
            { label }
        </button>
    )
}