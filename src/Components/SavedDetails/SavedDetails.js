import React from 'react'
import './SavedDetails.scss'
import { GET_USER } from "../Queries";
import { DELETE_USER_FAVORITE } from "../Queries";
import { gql, useMutation } from "@apollo/client";


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
            <button 
                className='delete-button' 
                onClick={(e) => {
                    e.preventDefault()
                    deleteUserFavorite()
                }}
            >
                Delete
            </button>
        )
    }

  return (
    <div className='saved-details-container'>
        HELLLO
    </div>
  )
}

export default SavedDetails