import { createPortal } from 'react-dom'
import classes from './Modal.module.css'
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

export default function Modal({children,open, onClose}){
    if(!open) return null;

    return createPortal(
        <div className={classes.modalBackground} onClick={onClose}>
            <motion.div 
                className={classes.modalContent} 
                onClick={(e)=>e.stopPropagation()}
                variants={{
                    visible: {opacity: 1, y: 0},
                    hidden: {opacity: 0, y: -30}
                }}
                initial='hidden'
                animate='visible'
                exit='hidden'
                transition={{duration: 0.3}}
            >
                <span className={classes.closeButton} onClick={onClose}><IoClose /></span>
                <div className={classes.modalChildren}>
                    {children}
                </div>
            </motion.div>
        </div>,
        document.getElementById('modal')
    )
    
}