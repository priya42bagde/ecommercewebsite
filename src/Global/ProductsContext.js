import React, {createContext, useState} from "react";
import shoe from "../assets/shoe.jpg"
import MicroPhone from "../assets/MicroPhone.jpg"
import vessel from "../assets/vessel.jpg"
import fan from "../assets/fan.jpg"
import Mobile from "../assets/Mobile.jpg"
import book from "../assets/book.jpg"
import chair from "../assets/chair.jpg"
import laptop from "../assets/laptop.jpg"

export const ProductsContext = createContext();

const ProductsContextProvider =(props)=>{
  const [products]=useState([
     {id:1, name:'shoe', price:500, image:shoe, status: 'hot'},
     {id:1, name:'MicroPhone', price:1000, image:MicroPhone, status: 'hot'},
     {id:1, name:'vessel', price:200, image:vessel, status: 'new'},
     {id:1, name:'fan', price:1500, image:fan, status: 'hot'},
     {id:1, name:'Mobile', price:5000, image:Mobile, status: 'new'},
     {id:1, name:'book', price:100, image:book, status: 'hot'},
     {id:1, name:'chair', price:400, image:chair, status: 'hot'},
     {id:1, name:'laptop', price:10000, image:laptop, status: 'new'}
  ]);
    return(
        <ProductsContext.Provider value={{products: [...products]}}>
        {props.children}

        </ProductsContext.Provider>

    )
}

export default ProductsContextProvider