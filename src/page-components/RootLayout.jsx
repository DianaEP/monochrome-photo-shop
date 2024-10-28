import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from './RootLayout.module.css'

export default function RouteLayout(){
    return(
        <div className={classes.layout}>
            <MainNavigation/>
            <main className={classes.main}>
                <Outlet/>
            </main>
        </div>
    )
}