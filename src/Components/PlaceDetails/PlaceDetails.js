import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.css";
//delete later
import samplePlaces from "../sampleData/samplePlaces";

const PlaceDetails = () => {
  const [details, setDetails] = useState({});

  const { place } = useParams();

  const getDetails = () => {
    //fetch based on place
    return samplePlaces[0].places[0];
  };

  useEffect(() => {
    setDetails(getDetails());
  });

  return (
    <div className="detailsPage">
      <Link to="/dasboard" className="backButton detailsButtons">
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
