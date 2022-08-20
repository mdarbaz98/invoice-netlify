import React, { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./View.css";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import { useReactToPrint } from 'react-to-print';

function View() {

  const componentRef = useRef();
  const [invoice, setInvoice] = useState();
  const { id } = useParams();

  const URL = `https://invoice2468.herokuapp.com/api/invoice/${id}`;

  const randomInvoiceNumber = Math.floor(Math.random() * 999)

  async function getInvoice() {
    try {
      const response = await axios.get(URL);
      setInvoice(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInvoice();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="view__page">
      <Button
        className="m-2"
        variant="contained"
        color="primary"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
      >
        Print
      </Button>
      <div className="invoice_bill" ref={componentRef}>
        <h1 className="text-center mb-5">Invoice</h1>
        <div className="Form__container">
          <div className="invoice__detail">
            <div>
              <h4>Maahi kids Collection</h4>
              <p>
                151, Appleview Town <br />
                Bakers Street <br />
                Chicago, IL 60411
              </p>
              <div className="my-4">
                <h6 className="mb-0">Bill To :</h6>
                <p>{invoice?.name}</p>
              </div>
            </div>
            <div className="text-center">
              <h5>Invoice Number</h5>
              <p>{randomInvoiceNumber}</p>
            </div>
          </div>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="greetings d-flex justify-content-between">
                <div className="left_section">
                  <strong>Total</strong>
                </div>
                <div className="right_section">
                  <p className="mb-0"><strong className="px-5">{invoice?.total}</strong></p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
