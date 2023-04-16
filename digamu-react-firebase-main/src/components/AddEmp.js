import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import EmpDataService from "../services/emp.services";

const AddEmp = ({ id, setEmpID }) => {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hours, setHours] = useState(0);
    const [AddUpdate, setAddUpdate] = useState(true);
    const [message, setMessage] = useState({error: false, msg: ""});

    // const register = async () => {
    //     try {
    //       const user = await createUserWithEmailAndPassword(
    //         auth,
    //         email,
    //         password
    //       );
    //       console.log(user);
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if(name === "" || salary === null || position === "" || email === "" || password === "") {
            setMessage({error: true, msg: "Missing fields"});
            return;
        }
        const newEmp = {
            name,
            salary,
            position,
            email,
        };
        console.log(newEmp);

        try{
            if(id !== undefined && id !== ""){
                await EmpDataService.updateEmp(newEmp);
                setAddUpdate(false);
                setMessage({error: false, msg: "Employee successfully added to database."});
                setEmpID("");
            }else {
                await EmpDataService.AddNewEmp(newEmp);
                setAddUpdate(true);
                try {
                    const user = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    console.log(user);
                  } catch (error) {
                    console.log(error.message);
                  }
                setMessage({error: false, msg: "Employee successfully added to database."});
            }
        }catch(error) {
            setMessage({error: true, msg: error.message});
            console.log(error.message);
        }

        setName("");
        setPosition("");
        setSalary("");
        setEmail("");
        setPassword("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await EmpDataService.getDish(id);
            setName(docSnap.data().name);
            setPosition(docSnap.data().position);
            setSalary(docSnap.data().salary);
            setEmail(docSnap.data().email);
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
            <p>Create/Update Employee</p>
            <form onSubmit={ handleSubmit }>
                <div className="grid xl:grid-cols-1 xl:gap-4">
                    <div className="relative z-0 mb-4 w-full group">
                        <input value={ name } onChange={ (e) => setName(e.target.value) } type="text" name="floating_emp_name" 
                        id="floating_emp_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_emp_name" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input value={ position } onChange={ (e) => setPosition(e.target.value) } type="text" name="floating_position" 
                        id="floating_position" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_position" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Work</label>
                    </div>
                    <div className="relative z-0 mb-4 w-full group">
                        <input value={ salary } onChange={ (e) => setSalary(e.target.value) } type="text" name="floating_salary" 
                        id="floating_salary" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_salary" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input value={ email } onChange={ (e) => setEmail(e.target.value) } type="email" name="floating_emp_email" 
                        id="floating_emp_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_emp_email" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input value={ password } onChange={ (e) => setPassword(e.target.value) } type="password" name="floating_password" 
                        id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " required />
                        <label for="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{AddUpdate?"Add":"Update"} Employee</button>
            </form>
        </div>
    );
}

export default AddEmp;