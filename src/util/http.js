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

