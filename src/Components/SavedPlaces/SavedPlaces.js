import React from "react";
import { Link } from "react-router-dom";
import "./SavedPlaces.scss";
import NavBar from "../NavBar/NavBar";
import Death from "../assets/deathandco.jpg";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Queries";

const SavedPlaces = ({ city, places }) => {
  const DisplayUser = () => {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const favoritesByCity = data.user.favorites.reduce((acc, value) => {
      if (!acc[value.city]) {
        acc[value.city] = [];
      }
      acc[value.city].push(value);
      return acc;
    }, {});

    const cities = Object.keys(favoritesByCity);
    const placesByCity = cities.map((city) => {
      <h2>{city}</h2>;
      const places = favoritesByCity[city].map((place) => {
        return (
          <Link
            to={`/${city}/${place.id}/saved`}
            key={place.id}
            className="place-thumb"
          >
            <div id={`${place.placeName}`} className="saved-place-card">
              <img className="saved-image" src={Death} alt="death and co" />
              <p className="place-text">{place.placeName}</p>
            </div>
          </Link>
        );
      });
      return (
        <div key={city}>
          <h2 className="cityName">{city}</h2>
          <div className="cityPlaces">{places}</div>
        </div>
      );
    });
    return placesByCity;
  };
  return (
    <>
      <NavBar city={city} />
      <div className="saved-container">
        <h1 className="saved-title">Saved Places</h1>
        <div className="saved-places-container">{<DisplayUser />}</div>
      </div>
    </>
  );
};

export default SavedPlaces;
