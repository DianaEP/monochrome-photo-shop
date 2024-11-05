export default function validation(data,formType){
    const errors = {}
    const currentDate = new Date();
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    if(formType === 'login' || formType === 'register' || formType === 'checkout'){
        if(!data.email.trim()){
            errors.email = "Email is required"
        }else if(!isValidEmail(data.email)){
            errors.email = "Email address is invalid"
        }
    }

    
    if(formType === 'checkout'){
        const normalizeCardNumber = (cardNumber) => cardNumber.replace(/\s/g, '');// Normalize the card number by removing spaces
        const normalizedCardNumber = normalizeCardNumber(data.cardNumber);
        const isCardExpired = (expiryDate) => {
            const [expiryMonth, expiryYear] = data.expiryDate.split('/').map(Number); // [month, year]
            const expiredDate = new Date(2000 + expiryYear, expiryMonth - 1, 1); // 1st of the month
            return new Date(expiredDate.getFullYear(), expiredDate.getMonth() + 1, 0); // Last day of the month
        }
        
        
        if(!data.fullName.trim()){
            errors.fullName = "Full Name is required"
        }
         
        if(!data.street.trim()){
            errors.street = "Street is required"
        }
        
        if(!data.number.trim() ){
            errors.number = "Number is required"
        }
        
        if(!data.location.trim()){
            errors.location = "Location is required"
        }
        
        if(!data.cardholderName.trim()){
            errors.cardholderName = "Cardholder Name is required"
        }
        
        if(!normalizedCardNumber || normalizedCardNumber.length < 16){
            errors.cardNumber = "Card Number must be at least 16 digits"
        }else if( normalizedCardNumber !== '1234567812345678'){
            errors.cardNumber = "Card Number is invalid"
        }
        
        if (!data.expiryDate.trim()) {
            errors.expiryDate = "Expiry Date is required";
        }
        
        if (isCardExpired(data.expiryDate) < currentDate) {
            errors.expiryDate = "Your card is expired";
        }
        
        if (!data.cvv.trim() || data.cvv.length < 3) {
            errors.cvv = "CVV must be at least 3 digits";
        }else if( data.cvv !== '123'){
            errors.cvv = 'CVV invalid'
        }
        
    }

    if(formType === 'login'){
        if (!data.password?.trim()) {
            errors.password = "Password is required";
        }
    }

    if(formType === 'register'){
        if (!data.password?.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!data.confirmPassword?.trim()) {
            errors.confirmPassword = "Confirm Password is required";
        }

        if(data.password !== data.confirmPassword){
            errors.confirmPassword = "Password don't match"
        }

        if(!data.firstName.trim()){
            errors.firstName = "First Name is required"
        }

        if(!data.lastName.trim()){
            errors.lastName = "Last Name is required"
        }
    }
    
    return errors;
}
// const normalizedCardNumber = data.cardNumber.replace(/\s/g, ''); 
// const currentDate = new Date();
// const [expiryMonth, expiryYear] = data.expiryDate.split('/').map(Number); // [month, year]
// const expiryDate = new Date(2000 + expiryYear, expiryMonth - 1, 1); // 1st of the month
// const lastDayOfExpiryMonth = new Date(expiryDate.getFullYear(), expiryDate.getMonth() + 1, 0); // Last day of the month