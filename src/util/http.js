import firebaseConfig from "../firebaseConfig";

export async function fetchProducts(){
    
    const response = await fetch(`${firebaseConfig.databaseURL}/products.json`);
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
    
    const response = await fetch(`${firebaseConfig.databaseURL}/products/product${id}.json`);
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
    const response =  await fetch(`${firebaseConfig.databaseURL}/orders.json`,{
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