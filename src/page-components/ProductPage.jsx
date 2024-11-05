import { useNavigate, useParams } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import classes from './ProductPage.module.css'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../util/http';
import ErrorBlock from '../components/ErrorBlock';
import Loading from '../components/Loading';
import { useContext } from 'react';
import CartContext from '../store/CartContext';

export default function ProductPage(){
    const cartContext = useContext(CartContext)
    const { id }= useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id)
    })
    console.log("ProductPage rendered");
    // console.log(data);
    
    if (isLoading) {
        return <Loading message='Loading product...' />;
    }

    if (isError) {
        return <ErrorBlock title={error.info} status={error.code} message={error.message}/>
    }

    function handleAddProductToCart(){
        if(data){
            cartContext.addProduct(data)
        }
    }
    
    return(
        <>
            <div className={classes.productPage}>
                <h2>Image & Story: Discover the Details</h2>
                <ProductItem product={data} handleAddProductToCart={handleAddProductToCart}/>
            </div>
        </>
    )
}