import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    user(id: "1") {
      favorites {
        ninjaId
        placeName
        city
      }
    }
  }
`;

export const CREATE_USER_FAVORITE = gql`
  mutation CreateUserFavorite(
    $userId: Int!
    $ninjaId: String!
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
        ninjaId: $ninjaId
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
  query FetchPlaces($city: String!, $country: String!, $categories: [String!]) {
    places(city: $city, country: $country, categories: $categories) {
      name
      address
      placeId
      categories
      lat
      lon
    }
  }
`;
