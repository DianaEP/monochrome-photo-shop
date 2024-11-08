import firebaseConfig from "../firebaseConfig";

export async function fetchProducts(){
    const idToken =  localStorage.getItem('authToken');
    const response = await fetch(`${firebaseConfig.databaseURL}/products.json?auth=${idToken}`);
    if(!response.ok){
        const errorText = await response.text()
        const error = new Error('An error occurred while fetching the products');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }
    
    const productsData  = await response.json();
    // console.log('Fetched products data:', productsData); 

    return productsData ;
}


export async function fetchProduct(id){
    const idToken =  localStorage.getItem('authToken');
    const response = await fetch(`${firebaseConfig.databaseURL}/products/product${id}.json?auth=${idToken}`);
    if(!response.ok){
        const errorText = await response.text()
        const error = new Error('An error occurred while fetching the product');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }
    
    const productData  = await response.json();
    // console.log('Fetched products data:', productsData); 

    return productData ;
}

export async function postOrders(orderData){
    const idToken =  localStorage.getItem('authToken');

    const response =  await fetch(`${firebaseConfig.databaseURL}/orders.json?auth=${idToken}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })

    if(!response.ok){
        const errorText = await response.text();
        const error = new Error('An error occurred while posting the error');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }

    const order = await response.json();

    return order;
}

// POST REGISTER

export async function register(userData){
    const{email, password, ...additionalData} = userData;

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        })
    })

    if(!response.ok){
        const errorText = await response.text();
        const error = new Error('Failed to Register');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }

    const dataRegister = await response.json();
    const uid = dataRegister.localId;
    
    const idToken = dataRegister.idToken;

    localStorage.setItem('authToken', idToken);

    await saveAdditionalUserData( additionalData, idToken, uid);

    return dataRegister;
}

// POST USER DATA TO USERS

async function saveAdditionalUserData( additionalData,idToken,uid){
   
    const response = await fetch(`${firebaseConfig.databaseURL}/users/${uid}.json?auth=${idToken}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${idToken}`, // it's not working for firebase
        },
        body: JSON.stringify(additionalData)
    })

    if(!response.ok){
        const errorText = await response.text();
        console.error('Error response from Firebase:', errorText);
        const error = new Error('Failed to save user data');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }

    const additionalUserData = await response.json();
    return additionalUserData;
}

// UPDATE USER DATA IN USERS

export async function updateAdditionalUserData(uid, updatedAdditionalData){
    const idToken = localStorage.getItem('authToken');

    const response = await fetch(`${firebaseConfig.databaseURL}/users/${uid}.json?auth=${idToken}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${idToken}`, // not working for firebase
        },
        body: JSON.stringify(updatedAdditionalData)
    })

    if(!response.ok){
        const errorText = await response.text();
        const error = new Error('Failed to update user data');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }

    const updatedAdditionalUserData = await response.json();
    return updatedAdditionalUserData;
}



// POST LOGIN

export async function login(userData){
    const{email, password} = userData;

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        })
    })

    if(!response.ok){
        const errorText = await response.text();
        const error = new Error('Failed to Login');
        error.code = response.status;
        error.info = errorText;
        throw error;
    }

    const dataLogin = await response.json();
    
    localStorage.setItem('authToken', dataLogin.idToken);
    return dataLogin;
}

