import { useLocation } from 'react-router-dom'
import classes from './Button.module.css'

export default function Button({children, onClose}){
    
    return(
        <button onClick={onClose} className={classes.button}>{children}</button>
    )
}