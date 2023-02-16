import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    user(id: "1") {
      favorites {
        id
        placeName
        city
      }
    }
  }
`;

export const CREATE_USER_FAVORITE = gql`
  mutation CreateUserFavorite(
    $userId: Int!
    $placeId: String!
    $placeName: String!
    $thumbnailUrl: String!
    $city: String!
    $state: String!
    $country: String!
    $address: String!
  ) {
    createUserFavorite(
      input: {
        userId: $userId
        placeId: $placeId
        placeName: $placeName
        thumbnailUrl: $thumbnailUrl
        city: $city
        state: $state
        country: $country
        address: $address
      }
    ) {
      success
      error
    }
  }
`;

export const FETCH_PLACES = gql`
  query FetchPlaces(
    $city: String!
    $country: String!
    $categories: [String!]
    $page: Int!
  ) {
    places(
      city: $city
      country: $country
      categories: $categories
      page: $page
    ) {
      name
      address
      placeId
      categories
      lat
      lon
    }
  }
`;

export const DELETE_USER_FAVORITE = gql`
  mutation DeleteUserFavorite($id: Int!) {
    deleteUserFavorite(input: { id: $id }) {
      success
    }
  }
`;
