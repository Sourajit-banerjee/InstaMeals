import React, { useContext,useEffect,useState } from "react";

import CartContext from "../../Store/cart-contetx";
import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const context = useContext(CartContext);


  //*reduce is amethod which converts an array of data into a single value
  const numberOfCartItems = context.items.reduce((currNumbeder, item) => {
    //* curr number is a vlaue which carried on executions(this value gets changed)
    return currNumbeder + item.amount;
  }, 0);
const btnClasses=`${classes.button} ${isBtnHighlighted?classes.bump:''}`
  const{items}=context;

  useEffect(()=>{
    if(items.length===0)
    {
      return;
    }
    setIsBtnHighlighted(true)

    const timer=setTimeout((()=>{
      setIsBtnHighlighted(false)
    }),300)

    return()=>{
      clearTimeout(timer)
    }
  },[items])


  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
