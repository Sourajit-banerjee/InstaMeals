import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amtIsValid, setAmtIsValid] = useState(true);

  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount; //*coverting sttring to number by adding a plus

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmtIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "Amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          //!these are all inputs deafult props already preswent
        }}
      />
      <button>+Add</button>
      {!amtIsValid && <h3>Please,enter a valid amount(1-5).</h3>}
    </form>
  );
};

export default MealItemForm;
