import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
//import { Table,Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto'; //npm install chart.js
import { Doughnut } from 'react-chartjs-2'; //npm i react-chartjs-2 chart.js
import 'reactjs-popup/dist/index.css'; //npm install reactjs-popup --save
import 'bootstrap/dist/css/bootstrap.min.css'; //npm install react-bootstrap bootstrap
//npm install @popperjs/core --save


import { Button, Collapse, Card, Stack } from 'react-bootstrap';
import DateSalesChart  from "./DateSalesChart";
import ProductSalesChart  from "./ProductSalesChart";
import OrderRecord from './OrderRecord';
import { padding } from 'tailwindcss/defaultTheme';

function Analytics() {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [table, setTable] = useState(false);

    return (
      <div className="Analytics">
          <Navbar />
          <div className='text-center'>
          <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Stack direction="horizontal" gap={5} className='ml-5 ml-lg-0 mt-5'>
                            <Button
                                onClick={() => {setOne(!one)}}
                                aria-controls="collapse-product"
                                aria-expanded={one}
                                md={4}
                            >
                                Product Analytics
                            </Button>
                            <Button
                                onClick={() => {setTwo(!two)}}
                                aria-controls="collapse-date"
                                aria-expanded={two}
                                md={4}
                            >
                                Date Sales Analytics
                            </Button>
                            <Button
                                onClick={() => {setTable(!table)}}
                                aria-controls="collapse-date"
                                aria-expanded={two}
                                md={4}
                            >
                                Orders Records
                            </Button>
                        </Stack>

                        <Collapse in={one}>
                            <Card body style={{width: '1000px'}} className='text-center'>
                            <Card.Title>Product Sales</Card.Title>
                                <ProductSalesChart className='text-center' />
                            </Card>
                        </Collapse>
                        <Collapse in={two}>
                        <Card body style={{width: '1000px'}} className='text-center' variant='primary'>
                            <Card.Title>Daily Sales</Card.Title>
                            <DateSalesChart className='text-center' />
                        </Card>  
                        </Collapse>
                        <Collapse in={table}>
                        <Card body style={{width: '1000px'}} className='text-center' variant='primary'>
                            <Card.Title>Order Records</Card.Title>
                            <OrderRecord />
                        </Card>  
                        </Collapse>                         
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    );
  }
  
  export default Analytics;
