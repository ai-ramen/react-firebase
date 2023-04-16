import React, { useState, useEffect } from 'react';
//import { Table,Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DishDataService from "../services/dish.services";
import OrderDataService from "../services/order.services";
import OrderItemDataService from "../services/orderitem.services";

const ProductSalesChart = () =>{    
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    getDishes();
  }, []);

  const getDishes = async () => {
    const data = await DishDataService.getAllDishes();
    //console.log(data.docs);
    setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //fetching data from database. Data is stored in "order" as array
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const data = await OrderDataService.getAllOrder();
    //console.log(data.docs);
    setOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //fetching data from database. Data is stored in "orde_itemr" as array
  const [order_item, setOrderitem] = useState([]);
  useEffect(() => {
    getOrderitem();
  }, []);

  const getOrderitem = async () => {
    const data = await OrderItemDataService.getAllOrderItem();
    //console.log(data.docs);
    setOrderitem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const data = {
    labels: [],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 0, 0)',
        'rgb(0,255,0)',
        'rgb(0,128,128)',
      ],
      hoverOffset: 6
    }]
    };

    for (var i = 0; i < dishes.length; i++) {
      var singleElement = dishes[i];
      var name = singleElement.name;
      data.labels.push(name);
    }

    for (var i = 0; i < dishes.length; i++) {
      var total=0;
      for (var t = 0; t < order_item.length; t++) {
        if(dishes[i].id==order_item[t].dish_id){
          var price = parseInt(dishes[i].price);
          total+=order_item[t].quantity*price;
        }
      }
      console.log(total);
      data.datasets[0].data.push(total);
    }

    return (
        <div className='text-center'>
            <h1>Most sold product of the week:</h1>
            <div style={{width:"50%"}} >
                <Doughnut data = { data } />
            </div>
            
        </div>
     );
}

export default ProductSalesChart;
