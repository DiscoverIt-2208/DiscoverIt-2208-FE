import './SavedDetails.scss'
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import samplePlaces from "../sampleData/samplePlaces";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";
import { DELETE_USER_FAVORITE } from "../Queries";


const SavedDetails = () => {
    const [savedDetails, setSavedDetails] = useState({});

    const { id } = useParams();
  
    const getSavedDetails = () => {
      const savedPlaces = samplePlaces[0].places;
      const found = savedPlaces.find((place) => place.id === +id);
      return found;
    };
  
    const DeleteUserFavorite = () => {
        const deleteUserFavorite = useMutation(
          DELETE_USER_FAVORITE,
          {
            variables: {
                id: 1
            },
            refetchQueries: [{ query: GET_USER }, "GetUser"],
          }
        );

        return (
          <button
            className="detailsButtons"
            onClick={(e) => {
              e.preventDefault();
              deleteUserFavorite();
            }}
          >
            Delete
          </button>
        );
      };

      useEffect(() => {
        setSavedDetails(getSavedDetails());
      }, [savedDetails]);

  return (
    <div>
        <h1>HELLO</h1>
        <DeleteUserFavorite />
    </div>
  )
}

export default SavedDetails