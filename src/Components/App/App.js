import React from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SplashPage/>} />
        <Route path='/search-page' element={<SearchPage/>} />
      </Routes>
    </>
  );
};

export default App;
