import { NavLink, useLocation, useParams } from "react-router-dom";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import classes from './ProductItem.module.css'

export default function ProductItem({ product }) {
  const location = useLocation();
  const { id } = useParams()

  const isOnProducts = location.pathname === '/products';
  const isOnProduct = location.pathname === `/products/${id}`;
  
  return (
    <li  className={isOnProduct ? classes.cardOnProduct : classes.card}>
      <div className={isOnProduct? classes.imageOnProduct : classes.image}>
        <img className={classes.img} src={product.imageUrl} alt={product.title} />
      </div>

      <div className={isOnProduct? classes.detailsOnProduct : classes.details}>
        <h3 className={classes.title}>{product.title}</h3>
        {isOnProduct && (<p>{product.description}</p>)}
        
        <div className={isOnProduct? classes.buyOnProduct : classes.buy}>
            <div>
              {isOnProduct && <span>Price: </span>}
              <p>{currencyFormatter.format(product.price)}</p>
            </div>
            {isOnProducts && (
              <button className={classes.button}><NavLink to={`/products/${product.id}`}>Details</NavLink></button> 
            )}
            {isOnProduct && (
              <button className={classes.button}><NavLink to={`/cart`}>Add to Cart</NavLink></button> 
            )}
        </div>

        {isOnProduct && (<div className={classes.instructions}>
          <span>*Care and Display Instructions: </span>
          <span>For lasting beauty, avoid direct sunlight on the print and handle 
             with care.
          </span>
        </div>)}
      </div>
    </li>
  );
}

