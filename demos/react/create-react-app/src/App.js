import React from "react";
// import { add, multiply } from './helpers';
// import cats, { meow } from "./cats"
import Alert from './Alert';
import Greeting from './Greeting';
import fakeLogo from './fakeLogo.svg'
import ShoppingCart from './ShoppingCart'
import items from './items'
import moreItems from './moreItems'
import "./App.css";

function App() {
  return (
    <div>
      <Alert variant="success">
        <h1>Welcome Back!</h1>
        <Greeting />
      </Alert>
      <Alert variant="danger">
        <h1> WARNING! </h1>
      </Alert>
      <img src={fakeLogo} id="logo" alt=""/>
      <ShoppingCart items={items} user="Carly"/>
      <ShoppingCart items={moreItems} user="Rusty"/>
    </div>
  );
}

export default App;
