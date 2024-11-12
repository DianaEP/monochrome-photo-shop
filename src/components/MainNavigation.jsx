import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import logo from '../assets/logo/mountain-logo.svg'
import classes from './MainNavigation.module.css'
import Button from "../UI/Button";
import { RiShoppingCartLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import ModalContextActions from "../store/ModalContextActions";
import AuthContext from "../store/AuthContext";

export default function MainNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const cartContext = useContext(CartContext);
  const modalContext = useContext(ModalContextActions);
  const{ handleLogout, isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);
  

  const totalCartProducts = cartContext.products.reduce((totalNrOfProducts,product)=>{
    return totalNrOfProducts + product.quantity;
  },0)

  function handleShowCart(){
    modalContext.showCart();
  }

  function handleShowUser(){
    modalContext.showUser();
  }

  function handleShowDeleteAccount(){
    modalContext.showDelete();
  }

  function handleUserLogout(){
    handleLogout();
    cartContext.clearCart();
    navigate("/auth");
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

          <div className={classes.svg}>
            {isLoggedIn && 
              <li onClick={handleShowDeleteAccount}>
                  <AiOutlineUserDelete />
              </li>
            }

            {isLoggedIn && 
              <li onClick={handleShowUser}>
                    <LiaUserEditSolid />
              </li>
            }


            <li onClick={handleShowCart}>
                <RiShoppingCartLine />
                {totalCartProducts > 0 && (
                  <span className={classes.badge}>{totalCartProducts}</span>
                )}
            </li>
          </div>

        </ul>
        {isLoggedIn ? (
          <Button onClick={handleUserLogout}>Logout</Button>
        ) : (
          <Button><NavLink to='/auth' className={({isActive}) => (isActive ? classes.active : undefined)}>Login</NavLink></Button>
        )}
      </nav>
    </header>
  );
}
