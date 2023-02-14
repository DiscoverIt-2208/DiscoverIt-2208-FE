import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import samplePlaces from "../sampleData/samplePlaces";
import BadURL from "../BadURL/BadURL";

const App = () => {
  const [city, setCity] = useState({
    properties: { city: "Unknown" },
  });
  const [places, setPlaces] = useState(samplePlaces);
  const [error, setError] = useState(false);
  const [loading, setLoad] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SplashPage />} />
        <Route
          exact
          path="/search-page"
          element={<SearchPage city={city.properties.city} setCity={setCity} />}
        />
        <Route
          exact
          path={`/:city/saved-places`}
          element={<SavedPlaces city={city.properties.city} places={places} />}
        />
        <Route
          exact
          path={`/:city/:id`}
          element={<PlaceDetails city={city} />}
        />
        <Route
          exact
          path={`/:city/dashboard`}
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
