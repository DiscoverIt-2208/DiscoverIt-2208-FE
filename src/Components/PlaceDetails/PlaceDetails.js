import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
//delete later
import samplePlaces from "../sampleData/samplePlaces";

const PlaceDetails = ({ city }) => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  const getDetails = () => {
    //fetch based on place
    const places = samplePlaces[0].places;
    const found = places.find((place) => place.id === +id);
    return found;
  };

  useEffect(() => {
    setDetails(getDetails());
  }, [details]);

  return (
    <div className="detailsPage">
      <Link to={`/${city}/dashboard`} className="backButton">
        Back
      </Link>
      <div className="detailsThumb">
        <h1 className="detailsTitle">{details.name}</h1>
        <button className="detailsButtons">Save</button>
        <div className="detailsInformation">
          <img
            className="detailsImage"
            src={details.image}
            alt={details.name}
          />
          <div className="information">
            <p className="infoText">Phone: {details.phoneNumber}</p>
            <p className="infoText">Hours: {details.hours}</p>
            <p className="infoText">Address: {details.address}</p>
            <p className="infoText">Description: {details.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
