import React, { useState } from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import samplePlaces from "../sampleData/samplePlaces";

const App = () => {
  const [city, setCity] = useState("Denver");
  const [places, setPlaces] = useState(samplePlaces);
  const [error, setError] = useState(false);
  const [loading, setLoad] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SplashPage />} />
        <Route exact path="/search-page" element={<SearchPage />} />
        <Route exact path="/saved-places" element={<SavedPlaces />} />
        <Route
          exact
          path={`/${city}/:id`}
          element={<PlaceDetails city={city} />}
        />
        <Route
          exact
          path={`/${city}/dashboard`}
          element={
            <Dashboard city={city} places={places} setPlaces={setPlaces} />
          }
        />
        {/*need to make dashboard path dynamic by city; using Denver for now*/}
      </Routes>
    </>
  );
};
export default App;
