import React from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SplashPage/>} />
        //Add route path for dashboard
        <Route path='/search-page' element={<SearchPage />} />
        <Route path='/saved-places' element={<SavedPlaces />} />
      </Routes>
    </>
  );
};

export default App;
