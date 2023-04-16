import React, { useEffect, useState } from "react";
import EmpDataService from "../services/emp.services";

const EmpList = ({ getEmpIdHandler }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        const data = await EmpDataService.getAllEmployees();
        console.log(data.docs);
        setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    const deleteHandle = async (id) => {
        await EmpDataService.deleteEmp(id);
        getEmployees();
    }

    return(
        <div class="container">
            <h1 class="mb-8">
                Employee List
            </h1>
            <table class="text-right w-1/2 ml-auto max-h-44">
                <thead class="bg-black flex text-white w-full">
                    <tr class="flex w-full mb-2">
                        <th class="p-4 w-1/6">Name</th>
                        <th class="p-4 w-1/6">Position</th>
                        <th class="p-4 w-1/6">Salary</th>
                        <th class="p-4 w-1/6">Email</th>
                        <th class="py-4 w-1/6 ">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">
                    { employees.map((doc) => {
                        return(
                            <tr class="flex w-full mb-4">
                                <td class="p-4 w-1/6">{ doc.name }</td>
                                <td class="p-4 w-1/6">{ doc.position }</td>
                                <td class="p-4 w-1/6"> { doc.salary } </td>
                                <td class="p-4 w-1/6">{ doc.email }</td>
                                <th class="py-4 w-2/6 m-auto">
                                    <a href="C:\Users\User\Documents\GitHub\digamu-react-firebase\public\index.html" class="bg-red-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-red-600 mr-6" onClick={ (e) => deleteHandle(doc.id) }>Remove</a>
                                </th>                
                            </tr>
                        );
                    }) }
                    
                </tbody>
            </table>
        </div>
    );
}

export default EmpList;