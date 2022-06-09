import React, { useEffect ,useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./mealItem/MealItem";

const AvailableMeals = () => {

  const[meals,setMeals]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  const[httError,setHttpError]=useState()
  //*the fucntion inside useffect which is supposed to return a cleaup fucntion is a async one so we cannot directly write
  //*asynch
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://custom-hooks-a7e47-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error("SOmethinh went wRONG!")
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
        setMeals(loadedMeals)
        setIsLoading(false)
    };
   
      fetchMeals().catch(error=>{  //*since we are thrwoing an error inside a promise,so the is also an asynch one
        setIsLoading(false)
        setHttpError(error.message)
      })
  
   
  }, []);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <h2>LOading.......</h2>
    </section>
  }

  if(httError){
    return   <section className={classes.MealsError}>
    <h2>{httError}</h2>
  </section>
  }
  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
