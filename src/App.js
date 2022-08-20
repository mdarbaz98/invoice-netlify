import "./App.css";
import Home from "./components/Home";
import Edit from "./components/Edit";
import View from "./components/View";
import Add from "./components/Add";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";



function App() {

  return (
    <div className="App">
      <main>
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
