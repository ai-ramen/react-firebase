import Navbar from '../components/Navbar';
import AddDish from './AddDish';
import DishList from './DishList';
import { useState } from 'react';

function Dishes() {
    const [dishID, setDishID] = useState("");

    const getDishIdHandler = (id) => {
      console.log("ID is: ", id);
      setDishID(id);
    }

    return (
      <div className="Dishes">
          <Navbar />
          <AddDish id={ dishID } setDishID={ setDishID } />
          <DishList getDishID={getDishIdHandler} />
      </div>
    );
  }
  
  export default Dishes;
  