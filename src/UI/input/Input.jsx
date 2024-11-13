import classes from './Input.module.css'
export default function Input({label, id, onChange, value, className='', ...props}){
    return(
       <div className={classes.container}>
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                value={value} 
                onChange={onChange}
                className={`${className ? classes[className] : ""}`} 
                {...props}/>
       </div> 
    )
}