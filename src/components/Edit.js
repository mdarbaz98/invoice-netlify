import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import './Edit.css'

function Edit() {

  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState({
    name: '',
    items: [
      {
        name: '',
        quantity: '',
        price: '',
      },
    ],
    total: '',
  });
  const { id } = useParams();

  const URL = `https://invoice2468.herokuapp.com/api/invoice/${id}`;

  async function getInvoice() {
    try {
      const response = await axios.get(URL);
      setInvoice(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInvoice();
  }, []);

  const setTotal = () => {
    var total = invoice?.items?.reduce((acc, curr) => {
      return (acc += curr.quantity * curr.price);
    }, 0);
    setInvoice((prevState) => ({ ...prevState, ['total']: total }))
  }

  const onInputChange = (name,value, index,name2) => {
    console.log(name,value, index,name2)
    if(name === 'items'){
      let temp = {...invoice};
      temp[name][index][name2] = value;
      setInvoice(temp);
      setTotal();
    } else {
      setInvoice((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  const addItem = () => {
    let copy = { ...invoice };
    copy.items[copy.items.length] = {
      name: "",
      quantity: "",
      price: "",
    };
    setInvoice(copy);
  };

  const updateInvoce = async () => {
    try {
      const response = await axios.put(URL, invoice);
      if(response) {
        alert('successfully updated')
        setTimeout(() => {
          navigate('/')
        },500)
      }
    } catch (error) {
      console.log(error);
      alert('somthing went wrong')
    }
  };

  return (
    <div className="edit__page mx-auto pt-5">
      <h1 className="text-center">Edit Invoice</h1>
      <div className="edit_formContainer p-4">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">
              Customer Name
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              value={invoice.name}
              placeholder="John wick"
              onChange={(e) => onInputChange('name',e.target.value)}
            />
          </div>
          {invoice?.items?.map((item,index) => (
            <div className="inner_items row gap-3">
              <div class="mb-3 col-12  col-lg">
                <label for="productName" class="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  placeholder="e.g T-shirt"
                  value={item.name}
                  onChange={(e) => {onInputChange('items', e.target.value,index,'name')}}
                />
              </div>
              <div class="mb-3 col-12  col-lg">
                <label for="productQuantity" class="form-label">
                  Product Quantity
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="productQuantity"
                  placeholder="e.g 20"
                  value={item.quantity}
                  onChange={(e) => {onInputChange('items', e.target.value,index,'quantity')}}
                />
              </div>
              <div class="mb-3 col-12  col-lg">
                <label for="productPrice" class="form-label">
                  Product Price
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="productPrice"
                  placeholder="e.g 20"
                  value={item.price}
                  onChange={(e) => {onInputChange('items', e.target.value,index,'price')}}
                />
              </div>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                className="mt-auto mb-3 ms-3 ms-lg-0 col-4  col-lg-2"
              >
                Delete
              </Button>
            </div>
          ))}
                        <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className="mt-auto mb-3"
                onClick={addItem}
              >
                Add
              </Button>
          <div class="mb-3">
            <label for="totalPrice" class="form-label">
              Total Price
            </label>
            <input
              type="number"
              class="form-control"
              value={invoice.total}
              id="totalPrice"
              name="total"
              disabled
            />
          </div>
          <Button
                variant="contained"
                color="success"
                startIcon={<SystemUpdateAltIcon />}
                className="mt-auto mb-3"
                onClick={updateInvoce}
              >
                Update
              </Button>
        </form>
      </div>
    </div>
  )
}

export default Edit