import React from "react";
import { Link } from "react-router-dom";
import "./SavedPlaces.scss";
import NavBar from "../NavBar/NavBar";
import Death from "../assets/deathandco.jpg";
import { useQuery, gql } from "@apollo/client";

const SavedPlaces = ({ city, places }) => {
  const GET_USER = gql`
    query GetUser {
      user(id: "1") {
        favorites {
          ninjaId
          placeName
        }
      }
    }
  `;

  const DisplayUser = () => {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);

    return data.user.favorites.map((place) => {
      return (
        <Link
          to={`/${city}/${place.id}`}
          key={place.name}
          className="place-thumb"
        >
          <div id={`${place.id}`} className="saved-place-card">
            <img className="saved-image" src={Death} alt="death and co" />
            <p>{place.placeName}</p>
          </div>
        </Link>
      );
    });
  };

  // const placeDetails = places.map((place) => {
  //   return (
  //     <Link
  //       to={`/${city}/${place.id}`}
  //       key={place.name}
  //       className="place-thumb"
  //     >
  //       <div id={`${place.id}`} className="saved-place-card">
  //         <img className="saved-image" src={Death} alt="death and co" />
  //         <h3>{city}</h3>
  //         <p>{place.name}</p>
  //       </div>
  //     </Link>
  //   );
  // });

  return (
    <>
      <NavBar city={city} />
      <div className="saved-container">
        <h1 className="saved-title">{city} Saved Places</h1>
        <div className="saved-places-container">{<DisplayUser />}</div>
      </div>
    </>
  );
};
export default SavedPlaces;
