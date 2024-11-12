import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './RootLayout.module.css'
import Cart from "../components/Cart";
import UserDetails from "../components/UserDetails";
import DeleteAccount from "../components/delete-account/DeleteAccount";

export default function RouteLayout(){
    return(
        <div className={classes.layout}>
            <MainNavigation/>
            <Cart/>
            <UserDetails/>
            <DeleteAccount/>
            <main className={classes.main}>
                <Outlet/>
            </main>
        </div>
    )
}