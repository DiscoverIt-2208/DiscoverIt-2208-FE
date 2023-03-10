import React, { useState } from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import SavedDetails from "../SavedDetails/SavedDetails";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import Quiz from "../Quiz/Quiz";
import BadURL from "../BadURL/BadURL";

const App = () => {
  const [city, setCity] = useState({});

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
          element={<SavedPlaces city={city} />}
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
        <Route exact path={`/dashboard`} element={<Dashboard city={city} />} />
        <Route exact path={"/quiz"} element={<Quiz />} />
        <Route path="/*" element={<BadURL />} />
      </Routes>
    </>
  );
};
export default App;
