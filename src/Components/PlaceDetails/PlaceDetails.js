import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
//delete later
import samplePlaces from "../sampleData/samplePlaces";
import NavBar from "../NavBar/NavBar";

const PlaceDetails = ({ city }) => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  const getDetails = () => {
    //fetch based on place
    const places = samplePlaces[0].places;
    const found = places.find((place) => place.id === +id);
    return found;
  };

  // argument :user_id, Integer, required: true
  // argument :ninja_id, String, required: true
  // argument :place_name, String, required: true
  // argument :thumbnail_url, String, required: false
  // # argument :city, String, required: true
  // # argument :state, String, required: false
  // # argument :country, String, required: true

  const CREATE_USER_FAVORITE = gql`
    mutation CreateUserFavorite {
      createUserFavorite(
        input: { userId: 1, ninjaId: "3049", placeName: "Larimer Lounge" }
      ) {
        success
      }
    }
  `;

  const CreateUserFavorite = () => {
    const [createUserFavorite, { data, loading, error }] =
      useMutation(CREATE_USER_FAVORITE);

    if (loading) console.log("Submitting...");
    if (error) console.log(`Submission error! ${error.message}`);

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

  useEffect(() => {
    setDetails(getDetails());
  }, [details]);

  return (
    <>
      <NavBar city={city} />
      <div className="detailsPage">
        <Link to={`/${city}/dashboard`} className="backButton">
          Back
        </Link>
        <div className="detailsThumb" alt={details.name}>
          <h1 className="detailsTitle">{details.name}</h1>
          {/* <button className="detailsButtons">Save</button> */}
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
