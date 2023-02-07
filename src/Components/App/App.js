import React from "react";
import Header from '../Header/Header'
import Home from "../Home/Home";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Home />
      </div>
    </>
  );
};

export default App;
