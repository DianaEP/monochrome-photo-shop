import { NavLink } from "react-router-dom";
import { GiBrokenWall } from "react-icons/gi";
import Cart from "./Cart";
import Search from "./Search";

export default function MainNavigation() {
  return (
    <header>
      <nav>
        <div>
            <GiBrokenWall />
            <p>LogoName</p>
        </div>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/products'>Products</NavLink>
          </li>
        </ul>
        <Cart/>
        <Search/>
        <button><NavLink to='/login'>Login</NavLink></button>
      </nav>
    </header>
  );
}
