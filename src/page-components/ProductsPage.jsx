import Search from "../components/Search";
import classes from './ProductsPage.module.css'
import ProductItem from "../components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ErrorBlock from "../components/ErrorBlock";


export default function ProductsPage(){
    const { data, isPending, isError, error} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })

    const productsArray = data? Object.values(data) : []; // convert the object in an array

    return(
        <>
            <div className={classes.productsPage}>
                <h2>A Journey Through Light and Shadow: Monochrome Photography</h2>
                <p>Explore the beauty and depth of monochrome photography, where every image tells a story through contrasts and nuances of light and shadow.</p>
                <Search/>
                <div>Category</div>
                {isPending && <p>Pending...</p>}
                {isError && 
                    <ErrorBlock title={error.info} status={error.code} message={error.message}/>}
                <ul className={classes.products}>
                    {productsArray.map((product)=>(
                        <ProductItem key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </>
    )
}