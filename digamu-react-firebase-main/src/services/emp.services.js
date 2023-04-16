import { db } from '../firebase-config';
import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
 } from 'firebase/firestore';

const EmpCollectionRef = collection(db, "Employees");

 class EmpDataService {
    AddNewEmp = (newEmp) => {
        return addDoc(EmpCollectionRef, newEmp);
    };
    
    updateEmp = (id, updatedEmp) => {
        const EmpDoc = doc(db, "Employees", id);
        return updateDoc(EmpDoc, updatedEmp);
      };
    
      deleteEmp = (id) => {
        const EmpDoc = doc(db, "Employees", id);
        return deleteDoc(EmpDoc);
      };
    
      getAllEmployees = () => {
        return getDocs(EmpCollectionRef);
      };
    
      getEmp = (id) => {
        const EmpDoc = doc(db, "Employees", id);
        return getDoc(EmpDoc);
      };

 }

export default new EmpDataService();
