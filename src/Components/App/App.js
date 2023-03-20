import React, { useState, useEffect } from "react";
import SplashPage from "../SplashPage/SplashPage";
import "./App.scss";
import { Routes, Route, useParams } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import SavedPlaces from "../SavedPlaces/SavedPlaces";
import SavedDetails from "../SavedDetails/SavedDetails";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Dashboard from "../Dashboard/Dashboard";
import Quiz from "../Quiz/Quiz";
import BadURL from "../BadURL/BadURL";

const App = () => {
  const [city, setCity] = useState({});
  const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   if (userId != user) {
  //     setUserId(user);
  //   }
  // }, [user]);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<SplashPage setUserId={setUserId} userId={userId} />}
        />
        <Route
          exact
          path="/:user/search-page"
          element={<SearchPage city={city} setCity={setCity} userId={userId} />}
        />
        <Route
          exact
          path={`/:user/saved-places`}
          element={<SavedPlaces city={city} userId={userId} />}
        />
        <Route
          exact
          path={`/:user/:city/:id`}
          element={<PlaceDetails city={city} userId={userId} />}
        />
        <Route
          exact
          path={`/:user/:city/:id/saved`}
          element={<SavedDetails city={city} userId={userId} />}
        />
        <Route
          exact
          path={`/:user/dashboard`}
          element={<Dashboard city={city} userId={userId} />}
        />
        <Route exact path={"/:user/quiz"} element={<Quiz userId={userId} />} />
        <Route path="/*" element={<BadURL />} />
      </Routes>
    </>
  );
};
export default App;
