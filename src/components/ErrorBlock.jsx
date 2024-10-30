import classes from './ErrorBlock.module.css'
import { BiSolidError } from "react-icons/bi";

export default function ErrorBlock({ title, message, status }) {
    return (
      <div className={classes.errorBlock}>
        <div className={classes.errorBlockIcon}><BiSolidError /></div>
        <div className={classes.errorBlockText}>
          <h2>{title}</h2>
          <p>{status}</p>
          <p>{message}</p>
        </div>
      </div>
    );
  }