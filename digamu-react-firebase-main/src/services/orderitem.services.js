import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  query,
} from 'firebase/firestore';

const OrderItemCollectionRef = collection(db, "order_item");
const OrderCollectionRef = collection(db, "orders");

class OrderItemDataService {
  AddNewOrderItem = (dish_id, dish_quantity, order_id, dish_name) => {

    return addDoc(OrderItemCollectionRef,
      {
        quantity: dish_quantity,
        dish_id: dish_id,
        order_id: order_id,
        dish_name: dish_name,
      }
    );
  };

  updateOrderItem = (id, updatedOrder) => {
    const orderDoc = doc(db, "order_item", id);
    return updateDoc(orderDoc, {
      quantity: updatedOrder.status,
      dish_id: updatedOrder.location,
      order_id: updatedOrder.note
    });
  };

  deleteOrderItem = (id) => {
    const orderDoc = doc(db, "order_item", id);
    return deleteDoc(orderDoc);
  };

  getAllOrderItem = () => {
    return getDocs(OrderItemCollectionRef);
  };

  getOrderItem = (id) => {
    const orderDoc = doc(db, "order_item", id);
    return getDoc(orderDoc);
  };


}

export default new OrderItemDataService();
