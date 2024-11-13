import { IoSearch } from "react-icons/io5";
import Button from "../../UI/button/Button";
import classes from './Search.module.css'
import { useState } from "react";
import ProductItem from "../product-item/ProductItem";

export default function Search({searchTerm, setSearchTerm}){
    
    function handleInputChange(event){
        setSearchTerm(event.target.value)
    }


    return(
        <>
            <div className={classes.search}>
                <div className={classes.searchInput}>
                    <IoSearch />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search products"/>
                </div>
                {/* <Button>Search</Button> */}
            </div>
        </>
    )
}