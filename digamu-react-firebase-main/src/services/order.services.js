import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';

const OrderCollectionRef = collection(db, "orders");

class OrderDataService {
  AddNewOrder = (newOrder) => {
    return addDoc(OrderCollectionRef, {
      location: newOrder.location,
      note: newOrder.note,
      order_date: newOrder.order_date,
      receiver: newOrder.receiver,
      status: newOrder.status,
      total: newOrder.total,
      method: newOrder.method,
      createdAt: serverTimestamp(),
    })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        return docRef;
      })
      .catch(error => console.error("Error adding document: ", error));
  };

  updateOrder = (id, updatedOrder) => {
    const orderDoc = doc(db, "orders", id);
    return updateDoc(orderDoc, {
      status: updatedOrder.status,
      location: updatedOrder.location,
      node: updatedOrder.note,
      order_date: updatedOrder.order_date,
      receiver: updatedOrder.receiver,
      total: updatedOrder.total,
      method: updatedOrder.method
    });
  };

  deleteOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return deleteDoc(orderDoc);
  };

  getAllOrder = () => {
    return getDocs(OrderCollectionRef);
  };

  getOrder = (id) => {
    const orderDoc = doc(db, "orders", id);
    return getDoc(orderDoc);
  };


}

export default new OrderDataService();
