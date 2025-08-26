import React from "react";
import { Container } from "react-bootstrap";

import Footer from "./component/Footer";
import Header from "./component/Header";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./component/screens/Homescreen";
import SignupScreen from "./component/screens/SignupScreen";
import LoginScreen from "./component/screens/LoginScreen";
import CartScreen from "./component/screens/CartScreen";

import ProductScreen from "./component/screens/ProductScreen";


function App() {
  return (
    <>
      <Router>
        <Header />
       
            <Routes>
              <Route exact path="/" element={<Homescreen/>} ></Route>

              <Route exact path="/product/:id" element={<ProductScreen/>} ></Route>

              <Route exact path="/login" element={<LoginScreen />}> </Route>
              <Route exact path="/signup" element={<SignupScreen />}> </Route>
              <Route exact path="/cart/:id?" element={<CartScreen />}> </Route>
            </Routes>
            
         
       
      </Router>
    </>
  );
}
export default App;