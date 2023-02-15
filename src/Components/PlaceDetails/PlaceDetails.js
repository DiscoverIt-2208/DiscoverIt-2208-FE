import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";
import { CREATE_USER_FAVORITE } from "../Queries";

const PlaceDetails = ({ city }) => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  const CreateUserFavorite = () => {
    const [createUserFavorite, { data, loading, error }] = useMutation(
      CREATE_USER_FAVORITE,
      {
        variables: {
          userId: 1,
          ninjaId: String(details.id),
          placeName: details.name,
          thumbnailUrl: details.image,
          city: city.properties.city,
          state: city.properties.state,
          country: city.properties.country,
          address: details.address,
        },
        refetchQueries: [{ query: GET_USER }, "GetUser"],
      }
    );

    if (loading) console.log("Submitting...");
    if (error) console.log(`Submission error! ${error.message}`);
    if (data) console.log(data);

    return (
      <button
        className="detailsButtons"
        onClick={(e) => {
          e.preventDefault();
          createUserFavorite();
        }}
      >
        Save
      </button>
    );
  };

  return (
    <>
      <NavBar city={city.properties.city} />
      <div className="detailsPage">
        <Link to={`/${city.properties.city}/dashboard`} className="backButton">
          Back
        </Link>
        <div className="detailsThumb" alt={details.name}>
          <h1 className="detailsTitle">{details.name}</h1>
          <CreateUserFavorite />
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
    </>
  );
};

export default PlaceDetails;
