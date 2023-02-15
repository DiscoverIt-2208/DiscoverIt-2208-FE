import './SavedDetails.scss'
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import samplePlaces from "../sampleData/samplePlaces";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";
import { CREATE_USER_FAVORITE } from "../Queries";


const SavedDetails = () => {
    const [savedDetails, setSavedDetails] = useState({});

    const { id } = useParams();
  
    const getDetails = () => {
      const savedPlaces = samplePlaces[0].places;
      const found = savedPlaces.find((place) => place.id === +id);
      return found;
    };
  
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
    <div>
        <h1>HELLO</h1>
    </div>
  )
}

export default SavedDetails