import { NavLink } from 'react-router-dom'
import Button from "../../UI/button/Button";
import { RiShoppingCartLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import classes from './MainNAvigation.module.css'

export default function NavigationLinks({
    isLoggedIn,
    totalCartProducts,
    handleShowCart,
    handleShowDeleteAccount,
    handleShowUser,
    handleUserLogout,
    isMenuOpen
  }){
    return(
        <>
             <ul className={`${classes.list} ${isMenuOpen ? classes.burgerNavList : ''} `}>
              <div className={`${classes.pages} ${isMenuOpen ? classes.burgerNavPages : ''} `}>
                <li>
                  <NavLink to='/' className={({isActive}) => (isActive ? classes.active : undefined)} end>Home</NavLink>
                </li>
                <li>
                  <NavLink to='/products' className={({isActive}) => (isActive ? classes.active : undefined)}>Products</NavLink>
                </li>
              </div>

              <div className={`${classes.svg} ${isMenuOpen ? classes.burgerNavSvg : ''} `}>
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
        </>
    )
}