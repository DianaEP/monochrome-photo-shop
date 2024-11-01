import { useParams } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import classes from './ProductPage.module.css'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../util/http';
import ErrorBlock from '../components/ErrorBlock';
import Loading from '../components/Loading';

export default function ProductPage(){
    const { id }= useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id)
    })

    console.log(data);
    
    if (isLoading) {
        return <Loading message='Loading product...' />;
    }

    if (isError) {
        return <ErrorBlock title={error.info} status={error.code} message={error.message}/>
    }
    
    return(
        <>
            <div className={classes.productPage}>
                <h2>Image & Story: Discover the Details</h2>
                <ProductItem product={data} />
            </div>
        </>
    )
}