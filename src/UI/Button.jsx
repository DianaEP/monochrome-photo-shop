import { useLocation } from 'react-router-dom'
import classes from './Button.module.css'

export default function Button({children}){
    
    return(
        <button className={classes.button}>{children}</button>
    )
}