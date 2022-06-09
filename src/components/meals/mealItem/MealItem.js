import classes from './MealItem.module.css'
import React,{useContext} from 'react'
import MealItemForm from './MealItemForm'
import CartContext from '../../../Store/cart-contetx'

const MealItem = (props) => {
  const catrtCtx=useContext(CartContext)

    const price=`$${props.price.toFixed(2)}` //*get price upto 2 dec places

    const addToCartHandler=(amt)=>{
      catrtCtx.addItem({
        id:props.id,
        price:props.price,
        name:props.name,
        amount:amt
      })
    }
  return (
      <li className={classes.meal}>
           <div>
           <div><h3>{props.name}</h3></div>
           <div className={classes.description}>{props.description}</div>
           <div className={classes.price}>{price}</div>
          </div>
          <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
          </div>
      </li>
   
  )
}

export default MealItem