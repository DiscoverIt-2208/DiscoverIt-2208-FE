import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import NavBar from "../NavBar/NavBar";
import { FETCH_PLACES } from "../Queries";

const Dashboard = ({ city, places, setPlaces }) => {
  const [categories, setCategories] = useState(["tourism.attraction"]);
  const [restaurantSelected, setRestaurantSelected] = useState(false);
  const [entertainmentSelected, setEntertainmentSelected] = useState(false);
  const [historySelected, setHistorySelected] = useState(false);
  const [cafeSelcted, setCafeSelected] = useState(false);
  const [popularSelected, setPopularSelected] = useState(true);
  const [accessibilitySelected, setAccessibilitySelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const DisplayPlaces = () => {
    const { data, loading, error } = useQuery(FETCH_PLACES, {
      variables: {
        city: city.properties.city,
        country: city.properties.country,
        categories: categories,
        page: currentPage,
      },
    });

    console.log(currentPage);

    if (loading) {
      return <p className="error">Submitting...</p>;
    }
    if (error) {
      return <p className="error">Submission error! {error.message}</p>;
    }

    const eachPlace = data.places.map((place) => {
      return (
        <PlaceCard
          key={place.placeId}
          place={place}
          city={city.properties.city}
        />
      );
    });
    return <div className="place-card-box">{eachPlace}</div>;
  };

  const changeCategory = (e) => {
    if (accessibilitySelected) {
      setCategories([e.target.value, "wheelchair"]);
    } else {
      setCategories([e.target.value]);
    }
  };

  const clearSelected = () => {
    setRestaurantSelected(false);
    setEntertainmentSelected(false);
    setHistorySelected(false);
    setCafeSelected(false);
    setPopularSelected(false);
  };

  return (
    <div className="dashboard">
      <NavBar city={city.properties.city} />
      <h1 className="city-name">{city.properties.city}</h1>
      <div className="buttons-container">
        <button
          className={restaurantSelected ? "selected" : "category-button"}
          value={"catering.restaurant"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setRestaurantSelected(true);
          }}
        >
          Restaurant
        </button>
        <button
          className={entertainmentSelected ? "selected" : "category-button"}
          value={"entertainment"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setEntertainmentSelected(true);
          }}
        >
          Entertainment
        </button>
        <button
          className={historySelected ? "selected" : "category-button"}
          value={"building.historic"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setHistorySelected(true);
          }}
        >
          History
        </button>
        <button
          className={cafeSelcted ? "selected" : "category-button"}
          value={"catering.cafe"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setCafeSelected(true);
          }}
        >
          Cafe
        </button>
        <button
          className={popularSelected ? "selected" : "category-button"}
          value={"tourism.attraction"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setPopularSelected(true);
          }}
        >
          Popular
        </button>
        <button
          className={accessibilitySelected ? "selected" : "category-button"}
          value="wheelchair"
          onClick={(e) => {
            setAccessibilitySelected(!accessibilitySelected);
            if (!accessibilitySelected) {
              setCategories([categories[0]]);
              setCategories([...categories, "wheelchair"]);
            } else {
              setCategories([categories[0]]);
            }
          }}
        >
          Accessibility
        </button>
      </div>
      <DisplayPlaces />
      <div className="back-forward">
        <button
          className="backPage"
          onClick={() => {
            if (currentPage !== 0) {
              const newCurrent = currentPage - 1;
              setCurrentPage(newCurrent);
              console.log(currentPage);
            }
          }}
        >
          Back
        </button>
        <button
          className="nextPage"
          onClick={() => {
            const newCurrent = currentPage + 1;
            setCurrentPage(newCurrent);
            console.log(currentPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
