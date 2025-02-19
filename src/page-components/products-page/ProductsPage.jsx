import Search from "../../components/search/Search";
import classes from './ProductsPage.module.css'
import ProductItem from "../../components/product-item/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../util/http";
import ErrorBlock from "../../components/error-block/ErrorBlock";
import { useEffect, useState } from "react";
import Category from "../../components/category/Category";
import Loading from "../../components/loading-block/Loading";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const productOnProducts = {
    hidden: { opacity: 0, scale: 0.95, rotate: 10},
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 100, duration: 0.5 } }
  }

export default function ProductsPage(){
    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    })
    const [products, setProducts] = useState([]);
    const[searchTerm, setSearchTerm] = useState('')
    const[selectedCategory, setSelectedCategory] = useState('')

    useEffect(()=>{
        if(data){
            setProducts(Object.values(data)) // turn object in an array
        }
    },[data])

    const filteredProducts = products.filter((product) => {
        const searchedProducts = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const selectedProducts =  selectedCategory ? product.category === selectedCategory : true;
        return searchedProducts && selectedProducts;
    })

    console.log(filteredProducts);
    

   

    return(
        <>
            <div className={classes.productsPage}>
                <h2>A Journey Through Light and Shadow: Monochrome Photography</h2>
                <p className={classes.description}>Explore the beauty and depth of monochrome photography, where every image tells a story through contrasts and nuances of light and shadow. Each image is showcased in a uniform height, perfect for large-scale wall displays, bringing elegance and balance to any space. These bold, high-quality prints transform walls into art.</p>
                <div className={classes.filters}>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                </div>
                {isLoading && 
                    <Loading message='Loading products...'/>}
                {isError && 
                    <ErrorBlock title={error.info} status={error.code} message={error.message}/>
                }
                {!isLoading && !isError && (
                <motion.ul 
                    className={classes.products}
                    variants={container}
                    initial="hidden"
                    animate="show" 
                    key={filteredProducts.length} // force the animation to render for each card
                >
                    {filteredProducts.length === 0 ? (
                        <p className={classes.noProduct}>No products found</p>
                    ):(
                        filteredProducts.map((product)=>(
                            <ProductItem key={product.id} product={product} productOnProducts={productOnProducts}/>
                        ))
                    )}
        
                </motion.ul>
)}
            </div>
        </>
    )
}



{/* <motion.ul 
className={classes.products}
variants={container}
initial="hidden"
animate="show" 
key={filteredProducts.length} // force the animation to render for each card
>
{!isLoading && !isError && filteredProducts.length === 0 ? (
    <p className={classes.noProduct}>No products found</p>
):(
    filteredProducts.map((product)=>(
        <ProductItem key={product.id} product={product} productOnProducts={productOnProducts}/>
    ))
)}

</motion.ul> */}