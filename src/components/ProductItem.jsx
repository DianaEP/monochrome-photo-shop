import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import classes from './ProductItem.module.css'
import { motion } from "framer-motion";

const productPageAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function ProductItem({ product, handleAddProductToCart, productOnProducts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams()

  const isOnProducts = location.pathname === '/products';
  const isOnProduct = location.pathname === `/products/${id}`;

  function handleDetailsNavigation(){
    navigate(`/products/${product.id}`)
  }

 
  return (
    <motion.li  
      className={isOnProduct ? classes.cardOnProduct : classes.card}
      variants={isOnProducts? productOnProducts : null}
     
    >
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
              <Button 
                onClick={handleDetailsNavigation}>
                  Details
              </Button> 
            )}
            {isOnProduct && (
              <Button 
                onClick={handleAddProductToCart}>
                  Add to Cart
              </Button> 
            )}
        </div>

        {isOnProduct && (<div className={classes.instructions}>
          <span>*Care and Display Instructions: </span>
          <span>For lasting beauty, avoid direct sunlight on the print and handle 
             with care.
          </span>
        </div>)}
      </div>
    </motion.li>
  );
}

