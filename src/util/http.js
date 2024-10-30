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
    console.log(productsData);

    return productsData;
}