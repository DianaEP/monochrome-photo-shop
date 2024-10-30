import { NavLink, useLocation } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import logo from '../assets/logo/logo-dark.svg'
import classes from './MainNavigation.module.css'
import Button from "../UI/Button";

export default function MainNavigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
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
          <li>
            <NavLink to='/cart' className={({isActive}) => (isActive ? classes.active : undefined)}><FaCartArrowDown /></NavLink>  
          </li>
        </ul>
        
        <Button><NavLink to='/login' className={({isActive}) => (isActive ? classes.active : undefined)}>Login</NavLink></Button>
      </nav>
    </header>
  );
}
