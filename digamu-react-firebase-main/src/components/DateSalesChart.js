import React, { useState, useEffect } from 'react';
//import { Table,Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DateSalesChart = () =>{    

    const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    datasets: [{
      label: '2nd week of October',
      data: [160, 50, 100, 120, 50, 100, 120],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(225, 9, 132)',
        'rgb(5, 162, 15)',
        'rgb(75, 205, 86)',
        'rgb(205, 11, 100)'
      ],
      hoverOffset: 4
    }]
    };

    return (
        <div className='text-center'>
            <h1>Most sales in the week:</h1>
                <div style={{width:"50%"}} >
                <Bar data = { data } />
            </div>
            
        </div>
     );
}

export default DateSalesChart;
