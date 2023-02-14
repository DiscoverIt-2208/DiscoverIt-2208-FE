import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
//delete later
import samplePlaces from "../sampleData/samplePlaces";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";

const PlaceDetails = ({ city }) => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  const getDetails = () => {
    console.log(details);
    //fetch based on place
    const places = samplePlaces[0].places;
    const found = places.find((place) => place.id === +id);
    return found;
  };

  const CREATE_USER_FAVORITE = gql`
    mutation CreateUserFavorite(
      $userId: Int!
      $ninjaId: String!
      $placeName: String!
      $thumbnailUrl: String!
    ) {
      createUserFavorite(
        input: {
          userId: $userId
          ninjaId: $ninjaId
          placeName: $placeName
          thumbnailUrl: $thumbnailUrl
        }
      ) {
        success
        error
      }
    }
  `;

  // const CreateUserFavorite = () => {
  // const [createUserFavorite, { data, loading, error }] = useMutation(
  //   CREATE_USER_FAVORITE,
  //   {
  //     variables: {
  //       ninjaId: id,
  //       placeName: details.name,
  //       thumbnail: details.image,
  //     },
  //   },
  //   {
  //     refetchQueries: [{ query: GET_USER }, "GetUser"],
  //   }
  // );
  const CreateUserFavorite = () => {
    const [createUserFavorite, { data, loading, error }] = useMutation(
      CREATE_USER_FAVORITE,
      {
        variables: {
          userId: 1,
          ninjaId: String(details.id),
          placeName: details.name,
          thumbnailUrl: details.image,
        },
      },
      {
        refetchQueries: [{ query: GET_USER }, "GetUser"],
      }
    );

    if (loading) console.log("Submitting...");
    if (error) console.log(`Submission error! ${error.message}`);

    console.log(data);

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
