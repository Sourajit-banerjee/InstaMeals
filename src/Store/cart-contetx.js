import React from "react";

//*We fill it with some default data which are not used anywhere but helps in auto completeion
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart:()=>{},
 
});

export default CartContext;
