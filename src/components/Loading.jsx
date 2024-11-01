import classes from './Loading.module.css'

export default function Loading({message}){
    return(
        <div className={classes.loading}>
            <p>{message}</p>
        </div>
    )
}