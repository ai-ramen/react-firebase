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

const DishCollectionRef = collection(db, "dishes");

 class DishDataService {
    AddNewDish = (newDish) => {
        return addDoc(DishCollectionRef, newDish);
    };
    
    updateDish = (id, updatedDish) => {
        const dishDoc = doc(db, "dishes", id);
        return updateDoc(dishDoc, updatedDish);
      };
    
      deleteDish = (id) => {
        const dishDoc = doc(db, "dishes", id);
        return deleteDoc(dishDoc);
      };
    
      getAllDishes = () => {
        return getDocs(DishCollectionRef);
      };
    
      getDish = (id) => {
        const dishDoc = doc(db, "dishes", id);
        return getDoc(dishDoc);
      };


 }

export default new DishDataService();
