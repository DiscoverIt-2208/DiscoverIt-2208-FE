import React from "react";
import { Link } from "react-router-dom";
import "./PlaceCard.scss";
import Death from "../assets/deathandco.jpg";

const PlaceCard = ({ place, city, image }) => {
  // console.log(typeof image);
  const fixedImage = image.split('"');
  const newImage = fixedImage[3];
  console.log(newImage);

  const images = newImage ? (
    <img className="card-img" src={newImage} alt={`${place.name}`} />
  ) : (
    <img className="card-img" src={Death} alt={`${place.name}`} />
  );

  return (
    <Link
      to={`/${city}/${place.placeId}`}
      className="place-thumb"
      key={place.placeId}
    >
      <div id={`${place.placeId}`} className="card-container" key={place.name}>
        {images}
        <h3 className="placeName">{place.name}</h3>
      </div>
    </Link>
  );
};

export default PlaceCard;
