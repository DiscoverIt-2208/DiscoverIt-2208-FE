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
