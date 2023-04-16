import React from "react";
import { useState } from "react";

const AvailabilityToggle = (getStatus) => {
    const [toggle, setToggle] = useState(!false);

    getStatus = toggle;

    const handleClick = () => {
        setToggle(!toggle);
        console.log(toggle);
    }

    return(
        <div className="m-4">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" onChange={handleClick}/>
                <label for="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
            <label for="toggle" className="text-xs text-gray-700">Dish {!toggle?"Available":"Unavailable"}</label>
        </div>
    );
};

export default AvailabilityToggle;