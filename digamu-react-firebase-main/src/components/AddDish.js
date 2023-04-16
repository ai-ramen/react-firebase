import React, { useState, useEffect } from "react";
import AvailabilityToggle from "./AvailabilityToggle";
import DishDataService from "../services/dish.services";
import GreenMsg from "./Alerts/greenMsg";
import YellowMsg from "./Alerts/yellowMsg";

const AddDish = ({ id, setDishID }) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState("Unavailable");
    const [AddUpdate, setAddUpdate] = useState(true);
    const [message, setMessage] = useState({error: false, msg: ""});

    const getStatusHandler = (status) => {
        console.log("Status is: ", status)
        setStatus(status);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if(name === "" || price === null) {
            setMessage({error: true, msg: "Missing fields"});
            return;
        }
        const newDish = {
            name,
            price,
            status,
        };
        console.log(newDish);

        try{
            if(id !== undefined && id !== ""){
                await DishDataService.updateDish(newDish);
                setAddUpdate(false);
                setMessage({error: false, msg: "Dish successfully added to database."});
                setDishID("");
            }else {
                await DishDataService.AddNewDish(newDish);
                setAddUpdate(true);
                setMessage({error: false, msg: "Dish successfully added to database."});
            }
        }catch(error) {
            setMessage({error: true, msg: error.message});
            console.log(error.message);
        }

        setName("");
        setPrice("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await DishDataService.getDish(id);
            setName(docSnap.data().name);
            setStatus(docSnap.data().status);
            setPrice(docSnap.data().price);
        } catch (error) {
            setMessage({error: true, msg: error.message});
        }
    }

    useEffect(() => {
        if(id !== undefined && id !== "") {
            editHandler();
        }
    });

    return( 
        <div className="w-1/3 mr-auto ml-5 mt-20 absolute">
            <p>Create/Update Dish</p>
            <form onSubmit={ handleSubmit }>
                <div className="grid xl:grid-cols-1 xl:gap-4">
                    <div className="relative z-0 mb-4 w-full group">
                        <input value={ name } onChange={ (e) => setName(e.target.value) } type="text" name="floating_dish_name" 
                        id="floating_dish_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_dish_name" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dish Name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input value={ price } onChange={ (e) => setPrice(e.target.value) } type="text" name="floating_dish_price" 
                        id="floating_dish_price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_dish_price" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dish Price</label>
                    </div>
                </div>
                {/* <AvailabilityToggle getStatus={getStatusHandler} /> */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{AddUpdate?"Add":"Update"} Dish</button>
            </form>
        </div>
    );
}

export default AddDish;