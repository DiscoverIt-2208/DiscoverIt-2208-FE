import React from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import Dashboard from "../Dashboard/Dashboard";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SplashPage/>} />
        <Route path='/search-page' element={<SearchPage />} />
        <Route path='/saved-places' element={<SavedPlaces />} />
        <Route path='/Denver/dashboard' element={<Dashboard />} />
        {/*need to make dashboard path dynamic by city; using Denver for now*/}
      </Routes>
    </>
  );
};

export default App;
