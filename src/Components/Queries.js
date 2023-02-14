import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    user(id: "1") {
      favorites {
        ninjaId
        placeName
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
