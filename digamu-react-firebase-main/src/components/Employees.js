import Navbar from '../components/Navbar';
import AddEmp from './AddEmp';
import EmpList from './EmpList';
import { useState } from 'react';

function Employees() {
  const [empID, setEmpID] = useState("");

  const getEmpIdHandler = (id) => {
    console.log("ID is: ", id);
    setEmpID(id);
  }

    return (
      <div className="Employees">
          <Navbar />
          <AddEmp id={ empID } setDishID={ setEmpID } />
          <EmpList setEmpID={getEmpIdHandler} />
      </div>
    );
  }
  
  export default Employees;
  