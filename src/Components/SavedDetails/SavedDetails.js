import React from 'react'
import './SavedDetails.scss'
import { Link } from "react-router-dom";
import { GET_USER } from "../Queries";
import { DELETE_USER_FAVORITE } from "../Queries";
import { gql, useMutation } from "@apollo/client";
import NavBar from '../NavBar/NavBar'


const SavedDetails = ({ city }) => {

    const DeleteUserFavorite = () => {
        const deleteUserFavorite = useMutation(
            DELETE_USER_FAVORITE,
            {
                variables: {
                    id: 1
                },
                refetchQueries: [{ query: GET_USER }, "GetUser"]
            }
        )

        return (
            <Link>
                <button 
                    className='delete-button' 
                    onClick={(e) => {
                        deleteUserFavorite()
                    }}
                >
                    Delete
                </button>
            </Link>
        )
    }

  return (
    <>
        <NavBar />
        <div className='saved-details-page'>
            <Link to={`/${city.properties.city}/dashboard`} className="backButton">
            Back
            </Link>
            <h1 className='saved-details-title'>Title of place</h1>
            <div className='saved-details-container'>

            </div>
            <DeleteUserFavorite />
        </div>
    </>
  )
}

export default SavedDetails