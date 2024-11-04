import { NavLink, useLocation } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import logo from '../assets/logo/logo-dark.svg'
import classes from './MainNavigation.module.css'
import Button from "../UI/Button";
import { RiShoppingCartLine } from "react-icons/ri";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import ModalContextActions from "../store/ModalContextActions";

export default function MainNavigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const cartContext = useContext(CartContext);
  const modalContext = useContext(ModalContextActions);

  const totalCartProducts = cartContext.products.reduce((totalNrOfProducts,product)=>{
    return totalNrOfProducts + product.quantity;
  },0)

  function handleShowCart(){
    modalContext.showCart();
  }

  return (
    <header className={`${classes.header} ${isHomePage? classes.homePage : classes.notHomePage}`}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
        <p>Echoes in Gray</p>
      </div>

      <nav className={classes.nav}>
        <ul className={classes.list}>
          <div className={classes.pages}>
            <li>
              <NavLink to='/' className={({isActive}) => (isActive ? classes.active : undefined)} end>Home</NavLink>
            </li>
            <li>
              <NavLink to='/products' className={({isActive}) => (isActive ? classes.active : undefined)}>Products</NavLink>
            </li>
          </div>

          <li onClick={handleShowCart}>
            <div className={classes.svg}>
              <RiShoppingCartLine />
              {totalCartProducts > 0 && (
                <span className={classes.badge}>{totalCartProducts}</span>
              )}
            </div>
          </li>
        </ul>
        
        <Button><NavLink to='/auth' className={({isActive}) => (isActive ? classes.active : undefined)}>Login</NavLink></Button>
      </nav>
    </header>
  );
}
