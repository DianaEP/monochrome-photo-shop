import { useState } from "react";
import validation from "../util/validation";
import { useAnimate } from "framer-motion";

export default function useFormValidation(initialData, formType, customHandleChange){
    const[formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const[scope, animate] = useAnimate()

    function handleChange(event){
        const{name, value} = event.target;

        if(customHandleChange){
            customHandleChange(name, value, setFormData)
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [name] : value
            }))
        }

        setErrors((prevErrors) => ({ //clear input error when typing
            ...prevErrors,
            [name] : ''
        }))
    }

    function validateOnSubmit(){
        const validateErrors = validation(formData, formType);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            animate('input',{
                x: [-10, 0, 10, 0]
            },{
                type: 'spring',
                duration: 0.2,
            })
            
            return false;
        }
        return true;
    }
    return{ formData, setFormData, errors, handleChange, validateOnSubmit, scope}
}