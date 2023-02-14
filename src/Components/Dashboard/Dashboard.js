import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import NavBar from "../NavBar/NavBar";
import SampleData from "../sampleData/samplePlaces";
import Death from "../assets/deathandco.jpg";

const Dashboard = ({ city, places, setPlaces }) => {
  const [categories, setCategories] = useState([]);
  const [restaurantSelected, setRestaurantSelected] = useState(false);
  const [entertainmentSelected, setEntertainmentSelected] = useState(false);
  const [historySelected, setHistorySelected] = useState(false);
  const [cafeSelcted, setCafeSelected] = useState(false);
  const [popularSelected, setPopularSelected] = useState(false);
  const [accessibilitySelected, setAccessibilitySelected] = useState(false);

  // useEffect(() => {
  //   setPlaces(SampleData[0].places);
  // }, [places, city]);

  const FETCH_PLACES = gql`
    query FetchPlaces {
      places(
        city: "Denver"
        country: "US"
        categories: ["production.brewery", "education.library"]
      ) {
        name
        address
        placeId
        categories
        lat
        lon
      }
    }
  `;

  const DisplayPlaces = () => {
    const { data, loading, error } = useQuery(FETCH_PLACES);

    if (loading) {
      console.log("Submitting...");
      return <p className="error">Submitting...</p>;
    }
    if (error) {
      console.log(`Submission error! ${error.message}`);
      return <p className="error">Submission error! {error.message}</p>;
    }

    console.log(data);

    const eachPlace = data.map((place) => {
      <PlaceCard place={place} city={city.properties.city} />;
    });

    return (
      <div className="place-card-box">
        <div className="place-card">{eachPlace}</div>
      </div>
    );
  };

  const changeCategory = (e) => [setCategories([e.target.value])];
  const clearSelected = () => {
    setRestaurantSelected(false);
    setEntertainmentSelected(false);
    setHistorySelected(false);
    setCafeSelected(false);
    setPopularSelected(false);
  };

  return (
    <>
      <NavBar city={city.properties.city} />
      <h1 className="city-name">{city.properties.city}</h1>
      <div className="buttons-container">
        <button
          className={restaurantSelected ? "selected" : "category-button"}
          value={"catering.restaurant"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setRestaurantSelected(!restaurantSelected);
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
            setEntertainmentSelected(!entertainmentSelected);
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
            setHistorySelected(!historySelected);
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
            setCafeSelected(!cafeSelcted);
          }}
        >
          Cafe
        </button>
        <button
          className={popularSelected ? "selected" : "category-button"}
          value={"tourism.attraction, tourism.sights"}
          onClick={(e) => {
            changeCategory(e);
            clearSelected();
            setPopularSelected(!popularSelected);
          }}
        >
          Popular
        </button>
        <button
          className={accessibilitySelected ? "selected" : "category-button"}
          onClick={() => {
            setAccessibilitySelected(!accessibilitySelected);
          }}
        >
          Accessibility
        </button>
      </div>
      <DisplayPlaces />
    </>
  );
};
export default Dashboard;
