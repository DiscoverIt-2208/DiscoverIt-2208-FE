import React, { useState } from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import samplePlaces from "../sampleData/samplePlaces";
import { useQuery, gql } from "@apollo/client";

const App = () => {
  const [city, setCity] = useState("Denver");
  const [places, setPlaces] = useState(samplePlaces);
  const [error, setError] = useState(false);
  const [loading, setLoad] = useState(false);

  const GET_PLACES = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;

  function QueryPlace() {
    const { loading, error, data } = useQuery(GET_PLACES);

    if (loading) console.log("Loading...");
    if (error) console.log(`Error ${error.message}`);
    console.log(data);

    return (
      <div>
        <p>Some sort of data</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<SplashPage />} />
        <Route
          exact
          path="/search-page"
          element={<SearchPage setCity={setCity} />}
        />
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
