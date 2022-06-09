import React from 'react'
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = (props) => {
  return (
    <>
    <header className={classes.header}>
        <h1>InstaMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
    </header>
    <div className={classes['main-image']}> 
    {/* when our classnames has dash write like these */}
        <img src={mealsImage} alt="meals img"/>
    </div>
    </>
  )
}

export default Header