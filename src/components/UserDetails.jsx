import classes from './UserDetails.module.css'
import Modal from '../UI/Modal'
import { useContext, useEffect, useState } from 'react'
import ModalContextActions from '../store/ModalContextActions'
import { AnimatePresence } from 'framer-motion';
import { auth } from '../firebaseConfig';
import { getAdditionalUserData } from '../util/http';
import { getAuth } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import ErrorBlock from './ErrorBlock';
import Input from '../UI/Input';
import Button from '../UI/Button';

export default function UserDetails(){
    const modalContext = useContext(ModalContextActions);
    const {data, isLoading, isError, error} = useQuery({
        queryKey:['user'],
        queryFn: getAdditionalUserData,
        enabled: modalContext.isOpenUser
    })

    const[userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        if(data){
            setUserDetails({
                firstName: data.firstName,
                lastName: data.lastName
            })
        }
    }, [data])


    function handleChange(event){
        const{name, value} = event.target;
        setUserDetails((prevDetails)=>({
            ...prevDetails,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(userDetails);
        
    }

    
    return(
        <AnimatePresence>
            {modalContext.isOpenUser && (
                <Modal open={modalContext.isOpenUser} onClose={modalContext.hideUser}>
                    <div className={classes.userModal}>
                        <h2>Your Details</h2>
                        {isError ? (
                            <ErrorBlock title={error.info} message={error.message} status={error.code}/>
                        ) : isLoading ? (
                            <Loading message='Loading details...'/>
                        ) : (
                            <form onSubmit={handleSubmit} className={classes.userForm}>
                                <div>
                                    <Input label='First Name' id='firstName' onChange={handleChange} value={userDetails.firstName} name='firstName'/>
                                    <Input label='Last Name' id='lastName' onChange={handleChange} value={userDetails.lastName} name='lastName'/>
                                </div>
                                <div className={classes.userButtons}>
                                    <Button onClick={modalContext.hideUser} textOnly type='button'>Cancel</Button>
                                    <Button onClick={modalContext.hideUser}>Save Changes</Button>
                                </div>
                            </form>

                        )}
                    </div>
                </Modal>
     
            )}

        </AnimatePresence>
    )
}