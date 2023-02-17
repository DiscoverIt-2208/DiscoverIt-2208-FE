import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    user(id: "1") {
      favorites {
        placeId
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
      imageData
    }
  }
`;

export const FETCH_PLACE_DETAILS = gql`
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

export const DELETE_USER_FAVORITE = gql`
  mutation DeleteUserFavorite($userId: Int!, $placeId: String!) {
    deleteUserFavorite(input: { userId: $userId, placeId: $placeId }) {
      success
    }
  }
`;
