import { createPortal } from 'react-dom'
import classes from './Modal.module.css'
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from 'react'

export default function Modal({children,open, onClose}){
    if(!open) return null;

    return createPortal(
        <div className={classes.modalBackground} onClick={onClose}>
            <div className={classes.modalContent} onClick={(e)=>e.stopPropagation()}>
                <span className={classes.closeButton} onClick={onClose}><IoClose /></span>
                {children}
            </div>
        </div>,
        document.getElementById('modal')
    )
    
}