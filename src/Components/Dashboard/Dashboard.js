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

  return (
    <>
      <NavBar city={city.properties.city} />
      <h1 className="city-name">{city.properties.city}</h1>
      <div className="buttons-container">
        <button
          className="category-button"
          value={"catering.restaurant"}
          onClick={changeCategory}
        >
          Restaurant
        </button>
        <button
          className="category-button"
          value={"entertainment"}
          onClick={changeCategory}
        >
          Entertainment
        </button>
        <button
          className="category-button"
          value={"building.historic"}
          onClick={changeCategory}
        >
          History
        </button>
        <button
          className="category-button"
          value={"catering.cafe"}
          onClick={changeCategory}
        >
          Cafe
        </button>
        <button
          className="category-button"
          value={"tourism.attraction, tourism.sights"}
          onClick={changeCategory}
        >
          Popular
        </button>
        <button className="category-button">Accessibility</button>
      </div>
      <DisplayPlaces />
    </>
  );
};
export default Dashboard;
