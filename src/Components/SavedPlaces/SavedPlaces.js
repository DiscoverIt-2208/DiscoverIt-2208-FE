import React from "react";
import { Link } from "react-router-dom";
import "./SavedPlaces.scss";
import NavBar from "../NavBar/NavBar";
import Death from "../assets/deathandco.jpg";
import { useQuery, gql } from "@apollo/client";
import { GET_USER } from "../Queries";

const SavedPlaces = ({ city, places }) => {
  const DisplayUser = () => {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return data.user.favorites.map((place) => {
      return (
        <Link
          to={`/${city}/${place.ninjaId}`}
          key={place.ninjaId}
          className="place-thumb"
        >
          <div id={`${place.ninjaId}`} className="saved-place-card">
            <img className="saved-image" src={Death} alt="death and co" />
            <p>{place.placeName}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <>
      <NavBar city={city} />
      <div className="saved-container">
        <h1 className="saved-title">{city} Saved Places</h1>
        <div className="saved-places-container">{<DisplayUser />}</div>
      </div>
    </>
  );
};
export default SavedPlaces;
