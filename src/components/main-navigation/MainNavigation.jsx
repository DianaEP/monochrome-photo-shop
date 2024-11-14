import {useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/mountain-logo.svg";
import classes from "./MainNavigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../store/CartContext";
import ModalContextActions from "../../store/ModalContextActions";
import AuthContext from "../../store/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import NavigationLinks from "./NavigationLinks";

export default function MainNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const cartContext = useContext(CartContext);
  const modalContext = useContext(ModalContextActions);
  const { handleLogout, isLoggedIn } = useContext(AuthContext);

  // For burger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); 
  };


  const totalCartProducts = cartContext.products.reduce(
    (totalNrOfProducts, product) => {
      return totalNrOfProducts + product.quantity;
    },
    0
  );

  function handleShowCart() {
    modalContext.showCart();
  }

  function handleShowUser() {
    modalContext.showUser();
  }

  function handleShowDeleteAccount() {
    modalContext.showDelete();
  }

  function handleUserLogout() {
    handleLogout();
    cartContext.clearCart();
    navigate("/auth");
  }
  return (
    <header
      className={classes.header}
    >
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
        <p>Echoes in Gray</p>
      </div>

      <div className={classes.burgerIcon} onClick={toggleMenu}>
        {isMenuOpen ? <RiCloseLargeFill /> : <RxHamburgerMenu />}
      </div>

      <nav className={classes.nav}>
        <NavigationLinks
          isLoggedIn={isLoggedIn}
          totalCartProducts={totalCartProducts}
          handleShowCart={handleShowCart}
          handleShowDeleteAccount={handleShowDeleteAccount}
          handleShowUser={handleShowUser}
          handleUserLogout={handleUserLogout}
          isMenuOpen={isMenuOpen}
        />
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className={`${classes.nav} ${isMenuOpen ? classes.burgerNav : ""} `}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -30 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            <NavigationLinks
              isLoggedIn={isLoggedIn}
              totalCartProducts={totalCartProducts}
              handleShowCart={handleShowCart}
              handleShowDeleteAccount={handleShowDeleteAccount}
              handleShowUser={handleShowUser}
              handleUserLogout={handleUserLogout}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={isMenuOpen ? setIsMenuOpen : undefined}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
