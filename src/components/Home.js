import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Home() {
  const [invoices, setInvoices] = useState(null);

  const URL = "https://invoice2468.herokuapp.com/api/invoice";

  async function getInvoices() {
    try {
      const response = await axios.get(URL);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteInvoice = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response) {
        alert("successfully Deleted");
        getInvoices();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="home__page px-lg-5 p-3">
      <h1 className="text-center my-3">Invoice System</h1>
      <Link to="/invoice">
        <Button
          className="my-4"
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          Add Invoice
        </Button>
      </Link>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell align="left">Customer Name </TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">
                    <Link to={`invoice/view/${row._id}`}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<RemoveRedEyeIcon />}
                      >
                        View
                      </Button>
                    </Link>
                    <Link to={`invoice/edit/${row._id}`}>
                      <Button
                        className="m-2"
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteInvoice(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;
