import classes from './HomePage.module.css'
import homeImg from '../assets/home-img/wall-2.jpeg'
import Button from '../UI/Button'
import { NavLink } from 'react-router-dom'

export default function HomePage(){
    return(
        <>
            <div className={classes.home}>
                <img src={homeImg} alt="" />
                <h1 className={classes.title}>Echoes in Gray: Timeless Monochrome Photography</h1>
                <div className={classes.button}>
                    <Button><NavLink to='/products'>Explore the Collection</NavLink></Button>
                </div>
            </div>
            <div className={classes.text}>
                <h2>About Us</h2>
                <p>
                    Discover the Art of Light and Shadow. At Echoes in Gray, 
                    we celebrate the beauty of black-and-white photography,
                    transforming fleeting moments into timeless pieces of art. 
                    Explore our carefully curated collection of monochrome prints 
                    that evoke emotion, depth, and a sense of nostalgia. Let your 
                    walls tell a story with shades of gray.
                </p>
            </div>
        </>
    )
}