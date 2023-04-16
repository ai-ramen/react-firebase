import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DishDataService from "../services/dish.services";
import OrderDataService from "../services/order.services";
import OrderItemDataService from "../services/orderitem.services";

const mystyle = {
  display: "flex",
};

const Order = () => {
  //fetching data from database. Data is stored in "users" as array
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    getDishes();
  }, []);

  const getDishes = async () => {
    const data = await DishDataService.getAllDishes();
    console.log(data.docs);
    setDishes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //fetching data from database. Data is stored in "order" as array
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const data = await OrderDataService.getAllOrder();
    console.log(data.docs);
    setOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //fetching data from database. Data is stored in "orde_itemr" as array
  const [order_item, setOrderitem] = useState([]);
  useEffect(() => {
    getOrderitem();
  }, []);

  const getOrderitem = async () => {
    const data = await OrderItemDataService.getAllOrderItem();
    console.log(data.docs);
    setOrderitem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [filterOrder, setfilterOrder] = useState([]);
  var A = order.filter((item) => item.status === 'preparing');
  var B = order.filter((item) => item.status === 'Done');

  //fetching data from database. Data is stored in "users" as array
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    fetch('/orderDetail')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setOrderDetail(response)
      })
  }, [])
  let tempAddEm = {
    receiver: '',
    location: '',
    order_date: '',
    note: '',
    total: 0,
    status: 'preparing',
    method: '',
  };

  let tempDishItem = {
    dish_id: '',
    quantity: '',
  };

  const [view, setView] = useState(false);//see details
  const [update, setUpdate] = useState(false);//update
  const [del, setDel] = useState(false);//delete
  const [done, setDone] = useState(false);//delete
  const [addem, setAdd] = useState(tempAddEm);//add new ? 
  const [selectedData, setSelectedData] = useState({});//data in selected cell
  const [selectedIng, setSelectedIng] = useState([]);//data in selected cell
  const [data, setData] = useState(dishes);
  const [showAdd, setShowadd] = useState(false);
  const [popIng, setShowIng] = useState(false);
  const [showDishList, setshowDishList] = useState(false);
  const [addIng, setaddIng] = useState({});//add new ingredients 
  const [showDishListNoBT, setshowDishListNoBT] = useState(false);
  const [tempDish, settempDish] = useState({});//temp dish to send to database
  const [selectedDish, setSelectedDish] = useState([]);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [dishItems, setDishItems] = useState([tempDishItem]);//data in selected cell

  const [showUpdateDish, setshowUpdateDish] = useState(false);

  const viewClose = () => setView(false);
  // const viewShow = () => setView(true);

  const updateClose = () => setUpdate(false);
  //  const updateShow = () => setUpdate(true);

  const delClose = () => setDel(false);
  //  const delShow = () => setDel(true);

  const doneClose = () => setDone(false);

  const addClose = () => setShowadd(false);
  const addShow = () => setShowadd(true);

  const IngClose = () => setShowIng(false);

  const ShowDishListClose = () => setshowDishList(false);

  const [newDish, setnewDish] = useState([]);

  const showDishListNoBTClose = () => setshowDishListNoBT(false);

  const showUpdateDishClose = () => setshowUpdateDish(false);




  // when you click the button, data in the cell will be stored in setSelectedData   
  const hanldeClick1 = (selectedRec) => {
    setSelectedData(selectedRec);
    const tempOderItem = order_item.filter((item) => item.order_id === selectedData.id);

    setSelectedOrderDetail(tempOderItem);
    setView(true);
  };

  const hanldeClick2 = (selectedRec) => {
    setSelectedData(selectedRec);

    const tempOderItem = order_item.filter((item) => item.order_id === selectedData.id);

    setSelectedOrderDetail(tempOderItem);


    setUpdate(true);
  };

  const hanldeClick3 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDel(true);
  };

  const hanldeClick4 = (selectedRec) => {
    setSelectedData(selectedRec);
    setDone(true);
  };

  const hanldeClickAddIng = (selectedRec) => {
    setSelectedData(selectedRec);
    setShowIng(true);
  };

  const showDish = () => {

    setshowDishList(true);
  };

  const showIngredientsNoButton = (selectedRec) => {
    setSelectedData(selectedRec);

    const tempOderItem = order_item.filter((item) => item.order_id === selectedData.id);

    setSelectedOrderDetail(tempOderItem);

    console.log(selectedDish);
    setshowDishListNoBT(true);
  };

  const showDishes = () => {

    setshowUpdateDish(true);
  };

  //data is deleted on front end
  const handleRemoveDish = (v) => {
    var temp = total;
    var A = dishes.filter((item) => item.id === v.id);
    temp -= parseInt(A[0].price);
    console.log(temp)
    setTotal(temp);
    setSelectedData({ ...selectedData, ['total']: temp });

    const newList = selectedIng.filter((item) => item.id !== v.id);

    setSelectedIng(newList);

    //delClose();
  }

  //data is deleted on front end (update)
  const handleRemoveDish2 = async (v) => {
    var temp = selectedData.total;
    var A = dishes.filter((item) => item.id === v.dish_id);
    temp -= parseInt(A[0].price);
    console.log(temp)
    setSelectedData({ ...selectedData, ['total']: temp });

    const newList = selectedOrderDetail.filter((item) => item.id !== v.id);
    await OrderItemDataService.deleteOrderItem(v.id);

    getOrderitem();

    setSelectedOrderDetail(newList);

    //delClose();
  }

  const All = () => {
    setfilterOrder(order);
  };

  const Preparing = () => {

    setfilterOrder(A);
  };

  const Delivered = () => {
    setfilterOrder(B);
  };

  //data is updated on front end
  const handleUpdate = () => {
    console.log(selectedData);
    const receiver = document.getElementById("receiver-update");
    const order_date = document.getElementById("order_date-update");
    const location = document.getElementById("location-update");
    const note = document.getElementById("note-update");
    //const bill = document.getElementById("bill-update");
    const method = document.getElementById("order_method-update");

    selectedData.receiver = receiver.value;
    selectedData.order_date = order_date.value;
    selectedData.location = location.value;
    selectedData.note = note.value;
    //selectedData.total_bill = bill.value;
    selectedData.method = method.value;

    // data.map((d)=>{
    //   d.id === selectedData.id
    //   ? { ...d, selectedData }
    //   : d

    // })
    updateClose();
  }

  //add new dishes and send it to database
  const addNew = async (e) => {
    e.preventDefault();
    const id = await OrderDataService.AddNewOrder(addem);
    console.log("returned id:", id.id);
    console.log(selectedIng);
    {
      selectedIng.map((v) => (
        OrderItemDataService.AddNewOrderItem(v.id, v.quantity, id.id, v.name)
      ))
    }
    setSelectedIng([]);
    setAdd();
    setTotal(0);
  }

  //when you click save changes, it is sent to database
  const saveUpdate = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    await OrderDataService.updateOrder(selectedData.id, selectedData);

  }

  //when you click save changes, it is sent to database
  const deleteIng = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    await OrderDataService.deleteOrder(selectedData.id);

    getOrders();

  }

  //add new ingredients to dishes and send it to database
  const saveMoreDish = async (e) => {
    e.preventDefault();
    //const quantity = document.getElementById("quantity");
    //const dish_id = document.getElementById("dish_id");

    //addIng.dish_id = dish_id.value;
    //addIng.quantity = quantity.value;


    //console.log(addIng);

  }

  //data is deleted on front end
  const handleDelete = (id) => {
    const newList = order.filter((item) => item.order_id !== id);

    setOrder(newList);

    delClose();
  }

  //data is deleted on front end
  const handleDone = () => {
    selectedData.status = 'Done';

    doneClose();
  }

  const saveDone = async (e) => {
    e.preventDefault();
    console.log(selectedData);
    await OrderDataService.updateOrder(selectedData.id, selectedData);

  }

  //add new dishes to an array ( front end)
  const addNewOrders = () => {
    addem.status = 'preparing';
    setOrder([...order,
      addem])
    addClose();
  }

  //add new dishes to an array ( front end)
  const addNewIng = () => {
    setDishes([...dishes,
      addem])
  }

  //add new dishes to an array ( front end)
  const addNewDishList = (selectedRec) => {
    //console.log(selectedRec);
    //settempDish({...tempDish, ...selectedRec});
    selectedRec.quantity = tempDish.quantity;
    setSelectedIng([...selectedIng,
      selectedRec]);


    // temp = tempDish.price*tempDish.quantity;
    // setNumber1(tempDish.price*tempDish.quantity);
    // setNumber2(total);

    // console.log(temp)
    var temp = parseInt(total);
    temp += parseInt(selectedRec.price);
    setTotal(temp);

    setAdd({ ...addem, ['total']: temp });
    console.log(addem);
  }

  //input data in add new dish (object)
  const handleInputDish = (e) => {
    e.persist();
    const nm = e.target.name;
    console.log(nm)
    settempDish({ ...tempDish, [nm]: e.target.value });
  }

  //input data in add new ingredient (object)
  const handleInput = (e) => {
    e.persist();
    const nm = e.target.name;
    console.log(nm)
    setAdd({ ...addem, [nm]: e.target.value });
  }

  //add new dishes to an update array ( front end)
  const addNewDish = async (selectedRec) => {

    settempDish({ ...tempDish, ...selectedRec });

    setSelectedOrderDetail([...selectedOrderDetail,
      tempDish])
    console.log(selectedRec.id)
    console.log(tempDish.quantity)//
    console.log(selectedData.id)
    console.log(selectedRec.name)//
    OrderItemDataService.AddNewOrderItem(selectedRec.id, tempDish.quantity, selectedData.id, selectedRec.name)

    var temp = parseInt(selectedData.total);
    temp += parseInt(selectedRec.price);
    setSelectedData({ ...selectedData, ['total']: temp });
    console.log(selectedData.total)
  }

  const saveNewDish = async (e) => {
    e.preventDefault();
    //const quantity = document.getElementById("quantity");
    //const dish_id = document.getElementById("dish_id");

    //addIng.dish_id = dish_id.value;
    //addIng.quantity = quantity.value;


    //console.log(addIng);

  }


  return (
    <>
      <Button variant="primary" onClick={addShow}>Add New Order</Button>{'  '}
      <Button variant="warning" onClick={All}>All</Button>{'  '}
      <Button variant="success" onClick={Preparing}>Preparing</Button>{'  '}
      <Button variant="info" onClick={Delivered}>Delivered</Button>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Delivery Date</th>
              <th>Dishes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterOrder.map((v) => (
              <tr>
                <td> {v.receiver} </td>
                <td> {v.order_date} </td>
                <td> <Button variant="warning" onClick={() => showIngredientsNoButton(v)}>...</Button> </td>
                <td>{v.status} </td>
                <td> <Button variant="success" onClick={() => hanldeClick1(v)}>View</Button>
                  {' '}<Button variant="warning" onClick={() => hanldeClick2(v)}>Update</Button>
                  {' '} <Button variant="info" onClick={() => hanldeClick4(v)}>Done</Button>
                  {' '} <Button variant="danger" onClick={() => hanldeClick3(v)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>


      {/*  pop up modal for view starts here */}
      <div>
        <Modal show={view} onHide={viewClose}>
          <Modal.Header closeButton>
            <Modal.Title>See Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <strong>Receiver:  {selectedData?.receiver}</strong>
            <br />
            <strong>Delivery date:  {selectedData?.order_date}</strong>
            <br />
            <strong>Location:  {selectedData?.location}</strong>
            <br />
            <strong>Note: <br /> {selectedData?.note}</strong>
            <br />
            <strong>Total Bill:  {selectedData?.total}</strong>
            <br />
            <strong>Method:  {selectedData?.method}</strong>
            <br />
            <strong>Dishes:  </strong>
            <br />
            {selectedOrderDetail.map((v) => (
              <p>
                Dish: { v.dish_name}
                {'  '}Quantity: { v.quantity}
              </p>
            ))}


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={viewClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/*  pop up modal for view ends here */}

      {/*  pop up modal for Update starts here */}
      <div>
        <Modal show={update} onHide={updateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <form onSubmit={saveUpdate} >
            <Modal.Body>

              <strong>Receiver:  </strong>
              <input type="text" id="receiver-update" defaultValue={selectedData?.receiver} name="receiver" />
              <br />

              <strong>Delevery date:  </strong>
              <input type="date" id="order_date-update" defaultValue={selectedData?.order_date} name="order_date" />
              <br />

              <strong>Method:  {selectedData?.method}</strong>
              <Form.Select size="sm" id="order_method-update" name="order_method" defaultValue={selectedData?.method} >
              <option value="dinein">Dine In</option>
              <option value="takeout">Take Out</option>
              <option value="delivery">Delivery</option>
              </Form.Select>
              <br />

              <strong>Location:  </strong>
              <input type="text" id="location-update" defaultValue={selectedData?.location} name="location" />
              <br />

              <strong>Note:  </strong><br />
              <textarea name="note" id="note-update" defaultValue={selectedData?.note} />
              <br />

              <strong>Total Bill:  {selectedData?.total}</strong><br />

              <br />

              <strong>Dish:  </strong>
              {selectedOrderDetail.map((v) => (
                <p>
                  Dish: { v.dish_name} {'  '}
            Quantity: { v.quantity}  {'  '}
                  <Button variant="primary" onClick={() => handleRemoveDish2(v)}>remove</Button>
                </p>
              ))}
              <br />
              <Button variant="success" onClick={() => showDishes()}>Add New Dish</Button>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={updateClose}>
                Close
          </Button>
              <Button variant="primary" onClick={handleUpdate} type="submit">
                Save Changes
          </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/*  pop up modal for Update ends here */}

      {/*  pop up modal for Delete starts here */}
      <div>
        <Modal show={del} onHide={delClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <form onSubmit={deleteIng} >
            <Modal.Body>
              <table class="table">
                <p>Are you sure you want to delete {selectedData?.receiver}?</p>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={delClose}>
                Close
          </Button>
              <Button variant="primary" onClick={() => handleDelete(selectedData.order_id)} type="submit">
                Delete
          </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/*  pop up modal for Delete ends here */}

      {/*  pop up modal for done starts here */}
      <div>
        <Modal show={done} onHide={doneClose}>
          <Modal.Header closeButton>
            <Modal.Title>Done</Modal.Title>
          </Modal.Header>
          <form onSubmit={saveDone} >
            <Modal.Body>
              <table class="table">
                <p>Is {selectedData?.receiver}'s order done?</p>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={doneClose}>
                Close
          </Button>
              <Button variant="primary" onClick={() => handleDone()} type="submit">
                Done
          </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/*  pop up modal for done ends here */}

      {/*  pop up modal for add orders starts here */}
      <div>
        <Modal show={showAdd} onHide={addClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Order</Modal.Title>
          </Modal.Header>
          <form onSubmit={addNew} >
            <Modal.Body>
              <strong>Receiver:  </strong>
              <input type="text" id="name-add" name="receiver" onChange={handleInput} />
              <br />

              <strong>Address:  </strong>
              <input type="text" id="name-add" name="location" onChange={handleInput} />
              <br />

              <strong>Date:  </strong>
              <input type="date" id="name-add" name="order_date" onChange={handleInput} />
              <br />
              
              <strong>Method:  </strong>
              <Form.Select size="sm" id="name-add" name="method" onChange={handleInput} >
              <option value="dinein">Dine In</option>
              <option value="takeout">Take Out</option>
              <option value="delivery">Delivery</option>
              </Form.Select>

              <strong>Note:  </strong>
              <textarea name="note" onChange={handleInput} />
              <br />

              <strong>Total bill:  </strong>
              {total}
              <br />


              <strong>Dish:  </strong>
              {selectedIng.map((v) => (
                <p>
                  Food name: { v.name} {'  '}
              Quantity: { v.quantity} {'  '}
                  <Button variant="primary" onClick={() => handleRemoveDish(v)}>remove</Button>
                </p>
              ))}
              <br />

              <Button variant="success" onClick={() => showDish()}>Add Dish</Button>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={addClose}>
                Close
          </Button>
              <Button variant="primary" onClick={addNewOrders} type="submit">
                Save Changes
          </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/*  pop up modal for add orders ends here */}



      {/*  pop up modal for adding dishes to order starts here */}
      <div>
        <Modal show={showDishList} onHide={ShowDishListClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dishes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>Dish</Col>
              <Col>{'     '}</Col>
              <Col>Price</Col>
              <Col>{'     '}</Col>
              <Col>Quantity</Col>
              <Col>{'     '}</Col>
              <Col>Action</Col>
            </Row>

            {dishes.map((v) => (


              <form onSubmit={saveMoreDish} >
                <Row>
                  <Col> {v.name} </Col>
                  <Col> {v.price} </Col>
                  <Col> <input type="number" id="quantity" name="quantity" onChange={handleInputDish} style={{ width: '70%' }} />
                  </Col>
                  <Col><Button variant="primary" onClick={() => addNewDishList(v)} type="submit">
                    ADD
              </Button></Col>

                </Row>
              </form>

            ))}


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ShowDishListClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/*  pop up modal for aadding dishes to orders ends here */}

      {/*  pop up modal for showing only dishes starts here */}

      <Modal show={showDishListNoBT} onHide={showDishListNoBTClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dish</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>Dish</Col>
            <Col>Quantity</Col>
          </Row>

          {selectedOrderDetail.map((v) => (
            <Row>
              <Col> {v.dish_name} </Col>
              <Col> {v.quantity} </Col>
            </Row>
          ))}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showDishListNoBTClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  pop up modal for showing only dishes ends here */}

      {/*  pop up modal for adding dishes to update starts here */}
      <div>
        <Modal show={showUpdateDish} onHide={showUpdateDishClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add More Dishes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>Dish</Col>
              <Col>{'     '}</Col>
              <Col>Price</Col>
              <Col>{'     '}</Col>
              <Col>Quantity</Col>
              <Col>{'     '}</Col>
              <Col>Action</Col>
            </Row>

            {dishes.map((v) => (

              <form onSubmit={saveNewDish} >
                <Row>

                  <Col> {v.name} </Col>
                  <Col> {v.price} </Col>
                  <Col> <input type="number" id="quantity" name="quantity" onChange={handleInputDish} style={{ width: '70%' }} />  </Col>
                  <Col><Button variant="primary" onClick={() => addNewDish(v)} type="submit">
                    ADD
              </Button></Col>
                </Row>
              </form>

            ))}


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={showUpdateDishClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/*  pop up modal for aadding dishes to update ends here */}


    </>
  );

}

export default Order;
