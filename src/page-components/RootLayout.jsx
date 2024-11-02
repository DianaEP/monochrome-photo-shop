import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './RootLayout.module.css'
import Cart from "../components/Cart";

export default function RouteLayout(){
    return(
        <div className={classes.layout}>
            <MainNavigation/>
            <Cart/>
            <main className={classes.main}>
                <Outlet/>
            </main>
        </div>
    )
}