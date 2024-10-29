import Search from "../components/Search";
import classes from './ProductsPage.module.css'
import initialProducts from "../data/initialData";
import ProductItem from "../components/ProductItem";


export default function ProductsPage(){
    const productArray = Object.values(initialProducts); // turn the object in an array

    console.log(productArray);
    return(
        <>
            <div>
                <h2>Products</h2>
                <Search/>
                <div>Category</div>
                <ul className={classes.products}>
                    {productArray.map((product)=>(
                        <ProductItem key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </>
    )
}