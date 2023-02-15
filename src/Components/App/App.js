import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import SavedDetails from "../SavedDetails/SavedDetails";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import BadURL from "../BadURL/BadURL";

const App = () => {
  const [city, setCity] = useState({});
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoad] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SplashPage />} />
        <Route
          exact
          path="/search-page"
          element={<SearchPage city={city} setCity={setCity} />}
        />
        <Route
          exact
          path={`/saved-places`}
          element={<SavedPlaces city={city} places={places} />}
        />
        <Route
          exact
          path={`/:city/:id`}
          element={<PlaceDetails city={city} />}
        />
        <Route
          exact
          path={`/:city/:id/saved`}
          element={<SavedDetails city={city} />}
        />
        <Route
          exact
          path={`/dashboard`}
          element={
            <Dashboard city={city} places={places} setPlaces={setPlaces} />
          }
        />
        <Route path="/*" element={<BadURL />} />
      </Routes>
    </>
  );
};
export default App;
