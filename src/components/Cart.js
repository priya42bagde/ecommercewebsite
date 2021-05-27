import React,{useContext} from "react";
import {CartContext} from "../Global/CartContext"
import { CartReducer } from "../Global/CartReducer";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure();

const Cart=(props)=>{
    const {shoppingCart, totalPrice, qty, dispatch} = useContext(CartContext);
    //const data = useContext(CartContext);
    //console.log(data);// adding to card
    const handleToken = async (token)=>{
       //console.log(token);
       const product  = {name:"All Products", price: totalPrice} 
       const response = await axios.post("http://localhost:8080/checkout", {
             product,
             token
        });
        const {status} = response.data;
        console.log(status);
        if (status==="success"){
            dispatch({type :'EMPTY'})
            props.history.push('/');
            toast.success("You have paid successfully", {position:toast.POSITION.TOP_RIGHT});
        }
        console.log(response);
    }
return(
<div className="container">
    <div className="cart-container" style={{marginTop: '100px'}}>
{shoppingCart.length >0 
? shoppingCart.map(cart=>(<div className='cart' key={cart.id}> 
<span className='cart-image'>
    <img src={cart.image} alt='not found'/>
</span>
<span className='cart-product-name'>
{cart.name}
</span>
<span className='cart-product-price'>
{cart.price}
</span>
<span className='inc' onClick={()=>dispatch({type:'INC', id: cart.id, cart:cart})}> 
<i className='fas fa-plus'></i>
</span>
<span className='product-quantity'>
{cart.qty}
</span>
<span className='dec' onClick={()=>dispatch({type:'DEC', id: cart.id, cart:cart})}>
<i className='fas fa-minus'></i>
</span>
<span className='product-total-price'>
${cart.price*cart.qty}.00
</span>
<span className='delete' onClick={()=>dispatch({type:'DELETE', id: cart.id, cart:cart})}>
<i className='fas fa-trash-alt'></i>
</span>
</div>))
:<div className="empty">Sorry your card is empty.</div>}
    </div>
{shoppingCart.length>0? 
<div className="cart-summary">
<div className="summary">
    <h3>Cart Summary</h3>
    <div className="total-items">
      <div className="items">
          Total Items
      </div>
      <div className="item-count">
          {qty}
      </div>
    </div>
    <div className="total-price-section"> 
    <div className="just-title">
          Total Price
      </div>
      <div className="item-price">
          ${totalPrice}.00
      </div> 
    <div className="stripe-section">
    <StripeCheckout
    stripeKey="pk_test_51IqfILSGBfzDew1juUWK27iUjeRDbECLzVimDHlzEBHEXKbLd8sJJWubscxjQbigJJGkVYjCiRh4oHHDQMHumYOw00pl2kFV6M"
    token={handleToken}
    billingAddress
    shippingAddress
    amount={totalPrice*100}
    name="All Products"
    >

    </StripeCheckout>
    </div>
</div>
</div>
</div>:''
}
</div>
)
}

export default Cart