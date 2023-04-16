import React, { useEffect, useState } from "react";
import DishDataService from "../services/dish.services";

const DishList = ({ getDishIdHandler }) => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        getDishes();
    }, []);

    const getDishes = async () => {
        const data = await DishDataService.getAllDishes();
        console.log(data.docs);
        setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    const deleteHandle = async (id) => {
        await DishDataService.deleteDish(id);
        getDishes();
    }

    return(
        <div class="container">
            <h1 class="mb-8">
                Dish List
            </h1>
            <table class="text-right w-1/2 ml-auto max-h-44">
                <thead class="bg-black flex text-white w-full">
                    <tr class="flex w-full mb-2">
                        <th class="p-4 w-1/3">Name</th>
                        <th class="p-4 w-1/3">Price</th>
                        <th class="py-4 w-1/3 ml-0 mr-5">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">
                    { dishes.map((doc, index) => {
                        return(
                            <tr class="flex w-full mb-4">
                                <td class="p-4 w-1/3">{ doc.name }</td>
                                <td class="p-4 w-1/3"> { doc.price } </td>
                                <th class="py-4 w-1/3">
                                    <a href="C:\Users\User\Documents\GitHub\digamu-react-firebase\public\index.html" class="bg-red-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-red-600 mr-6" onClick={ (e) => deleteHandle(doc.id) }>Delete</a>
                                </th>                
                            </tr>
                        );
                    }) }
                    
                </tbody>
            </table>
        </div>
    );
}

export default DishList;