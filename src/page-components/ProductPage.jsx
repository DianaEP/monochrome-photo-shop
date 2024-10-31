import { useParams } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import classes from './ProductPage.module.css'
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../util/http';
import ErrorBlock from '../components/ErrorBlock';

export default function ProductPage(){
    const { id }= useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id)
    })

    console.log(data);
    
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <ErrorBlock title={error.info} status={error.code} message={error.message}/>
    }
    
    return(
        <>
            <div>
                <ProductItem product={data} />
            </div>
        </>
    )
}