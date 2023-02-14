import React from "react";
import { Link } from "react-router-dom";
import "./PlaceCard.scss";

const PlaceCard = ({ places, city }) => {
  const eachPlace = places.map((place) => {
    return (
      <Link to={`/${city}/${place.id}`} className="place-thumb">
        <div id={`${place.id}`} className="card-container" key={place.name}>
          <img className="card-img" src={place.image} alt={`${place.name}`} />
          <h3>{place.name}</h3>
        </div>
      </Link>
    );
  });

  return <div className="place-card-container">{eachPlace}</div>;
};

export default PlaceCard;
