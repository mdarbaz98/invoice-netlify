import React, { useEffect, useState } from "react";
import "./Add.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Add() {
  const navigate = useNavigate();
  const URL = "https://invoice2468.herokuapp.com/api/invoice";

  const [invoiceData, setInvoiceData] = useState({
    name: "",
    items: [
      {
        name: "",
        quantity: "",
        price: "",
      },
    ],
    total: "",
  });

  const setTotal = () => {
    var total = invoiceData?.items?.reduce((acc, curr) => {
      return (acc += curr.quantity * curr.price);
    }, 0);
    setInvoiceData((prevState) => ({ ...prevState, ['total']: total }))
  }

  const addItem = () => {
    let copy = { ...invoiceData };
    copy.items[copy.items.length] = {
      name: "",
      quantity: "",
      price: "",
    };
    setInvoiceData(copy);
  };

  const deleteItem = (index) => {
    let copy = { ...invoiceData };
    copy.items.splice(index, 1);
    setInvoiceData(copy);
  };

  const onInputChange = (target, value, index, target2) => {
    if (target === "items") {
      let temp = { ...invoiceData };
      temp[target][index][target2] = value;
      setInvoiceData(temp);
      setTotal();
    } else {
      setInvoiceData((prevState) => ({ ...prevState, [target]: value }));
    }
  };

  const addInvoice = async () => {
    try {
      const response = await axios.post(URL, invoiceData);
      if (response) {
        toast("Successfully Added!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvoice();
  };

  return (
    <div className="add__page d-flex justify-content-center align-content-center">
      <div className="Add_page_content">
        <h1 className="text-center">Add Invoice</h1>
        <ToastContainer />
        <div className="add_formContainer p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="John wick"
                value={invoiceData.name}
                name="username"
                onChange={(e) => onInputChange("name", e.target.value)}
              />
            </div>
            {invoiceData?.items?.map((item, index) => (
              <div key={index} className="inner_items row  gap-3">
                <div className="mb-3 col-12  col-lg">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control name"
                    id="productName"
                    placeholder="e.g T-shirt"
                    value={item.name}
                    name={`name`}
                    data-id={`name${index}`}
                    onChange={(e) =>
                      onInputChange("items", e.target.value, index, "name")
                    }
                  />
                </div>
                <div className="mb-3 col-12  col-lg">
                  <label htmlFor="productQuantity" className="form-label">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control quantity"
                    id="productQuantity"
                    placeholder="e.g 20"
                    value={item.quantity}
                    name={`quantity`}
                    data-id={`quantity${index}`}
                    onChange={(e) =>
                      onInputChange("items", e.target.value, index, "quantity")
                    }
                  />
                </div>
                <div className="mb-3 col-12  col-lg">
                  <label htmlFor="productPrice" className="form-label">
                    Product Price
                  </label>
                  <input
                    type="number"
                    className="form-control price"
                    id="productPrice"
                    placeholder="e.g 20"
                    value={item.price}
                    name={`price`}
                    data-id={`price${index}`}
                    onChange={(e) =>
                      onInputChange("items", e.target.value, index, "price")
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  className="mt-auto mb-3 ms-3 ms-lg-0 col-4 col-lg-2"
                  onClick={(e) => {
                    deleteItem(index);
                  }}
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
            <div className="mb-3">
              <label htmlFor="totalPrice" className="form-label">
                Total Price
              </label>
              <input
                type="number"
                className="form-control"
                value={invoiceData.total}
                id="totalPrice"
                name="total"
                disabled
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="mt-auto mb-3"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
