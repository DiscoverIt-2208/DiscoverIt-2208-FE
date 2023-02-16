import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";
import { CREATE_USER_FAVORITE } from "../Queries";

const PlaceDetails = ({ city }) => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  const FETCH_PLACE_DETAILS = gql`
    query PlaceDetails($placeId: String!) {
      placeDetails(placeId: $placeId) {
        name
        city
        state
        country
        phone
        website
        hours
        categories
        address
        lat
        lon
        imageData
      }
    }
  `;

  const DisplayPlace = () => {
    const { loading, error, data } = useQuery(FETCH_PLACE_DETAILS, {
      variables: {
        placeId: id,
      },
    });
    if (loading) return <p>"Loading..."</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);
    setDetails(data.placeDetails);

    return (
      <div className="detailsThumb" alt={data.placeDetails.name}>
        <h1 className="detailsTitle">{data.placeDetails.name}</h1>
        <CreateUserFavorite />
        <div className="detailsInformation">
          <img
            className="detailsImage"
            src={data.placeDetails.imageData}
            alt={data.placeDetails.name}
          />
          <div className="information">
            <p className="infoText">Phone: {data.placeDetails.phone}</p>
            <p className="infoText">Hours: {data.placeDetails.hours}</p>
            <p className="infoText">Address: {data.placeDetails.address}</p>
            <p className="infoText">Address: {data.placeDetails.website}</p>
            <p className="infoText">
              Categories: {data.placeDetails.categories}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const CreateUserFavorite = () => {
    const [createUserFavorite, { data, loading, error }] = useMutation(
      CREATE_USER_FAVORITE,
      {
        variables: {
          userId: 1,
          placeId: id,
          placeName: details.name,
          thumbnailUrl: `${details.imageData}`,
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
        <Link to={`/dashboard`} className="backButton">
          Back
        </Link>
        <DisplayPlace />
        {/* <div className="detailsThumb" alt={details.name}>
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
        </div> */}
      </div>
    </>
  );
};

export default PlaceDetails;
