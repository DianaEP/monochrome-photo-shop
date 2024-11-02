export default function validation(data){
    const errors = {}
    const normalizedCardNumber = data.cardNumber.replace(/\s/g, ''); // Normalize the card number by removing spaces
    const currentDate = new Date();
    const [expiryMonth, expiryYear] = data.expiryDate.split('/').map(Number); // [month, year]
    const expiryDate = new Date(2000 + expiryYear, expiryMonth - 1, 1); // 1st of the month
    const lastDayOfExpiryMonth = new Date(expiryDate.getFullYear(), expiryDate.getMonth() + 1, 0); // Last day of the month


    if(!data.fullName.trim()){
        errors.fullName = "Full Name is required"
    }

    if(!data.email.trim()){
        errors.email = "Email is required"
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = "Email address is invalid"
    }

    if(!data.street.trim()){
        errors.street = "Street is required"
    }

    if(!data.number.trim() ){
        errors.number = "Number is required"
    }

    if(!data.location.trim){
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

    if (lastDayOfExpiryMonth < currentDate) {
        errors.expiryDate = "Your card is expired";
    }

    if (!data.cvv.trim() || data.cvv.length < 3) {
        errors.cvv = "CVV must be at least 3 digits";
    }else if( data.cvv !== '123'){
        errors.cvv = 'CVV invalid'
    }

    return errors;
}