import React, { useContext,useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-contetx";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const[isSubmitting,setIsSubmitting]=useState(false)
  const[didSubmit,setDidSubmit]=useState(false)
  const[isCheckout,setIsCheckout]=useState(false)

  const cartCtx = useContext(CartContext);
  const amt = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };


  const orderHandler=async (userData)=>{
    setIsSubmitting(true)
  await  fetch("https://custom-hooks-a7e47-default-rtdb.firebaseio.com/orders.json",{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })

    })
   
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }
const onBtnClickHandler=()=>{
  setIsCheckout(true)
}
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        // <li>{item.name}</li>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
        //!bind pre-configures the args of then function which are to be used when its called
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onBtnClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{amt}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={orderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
 

export default Cart;
