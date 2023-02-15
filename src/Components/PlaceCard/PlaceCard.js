import React from "react";
import { Link } from "react-router-dom";
import "./PlaceCard.scss";
import Death from "../assets/deathandco.jpg";

const PlaceCard = ({ place, city }) => {
  console.log(place);
  return (
    <Link
      to={`/${city}/${place.placeId}`}
      className="place-thumb"
      key={place.placeId}
    >
      <div id={`${place.placeId}`} className="card-container" key={place.name}>
        <img className="card-img" src={Death} alt={`${place.name}`} />
        <h3>{place.name}</h3>
      </div>
    </Link>
  );
};

export default PlaceCard;
