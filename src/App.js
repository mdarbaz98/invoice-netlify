import "./App.css";
import Home from "./components/Home";
import Edit from "./components/Edit";
import View from "./components/View";
import Add from "./components/Add";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer } from "react-toastify";



function App() {

  return (
    <div className="App">
      <main>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar  variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>Maahi Kids Collection</Navbar.Brand>
        </Container>
      </Navbar>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="invoice" element={<Add />} />
          <Route path="invoice/view/:id" element={<View />} />
          <Route path="invoice/edit/:id" element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
