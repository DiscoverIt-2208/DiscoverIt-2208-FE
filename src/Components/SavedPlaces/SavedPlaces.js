import React from "react";
import { Link } from "react-router-dom";
import "./SavedPlaces.scss";
import NavBar from "../NavBar/NavBar";
import Death from "../assets/deathandco.jpg";
import { useQuery, gql } from "@apollo/client";
import { GET_USER } from "../Queries";

const SavedPlaces = ({ city, places }) => {
  const DisplayUser = () => {
    const { loading, error, data } = useQuery(GET_USER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const favoritesByCity = data.user.favorites.reduce((acc, value) => {
      if (!acc[value.city]) {
        acc[value.city] = [];
      }
      acc[value.city].push(value);
      return acc;
    }, {});

    console.log("GROUP BY", favoritesByCity)
    console.log("HELLO", Object.keys(favoritesByCity))

    //Iterate through each object by key, go into object and iterate through the places array and return a thumbnail of each place
    const cities = Object.keys(favoritesByCity)
    const placesByCity = cities.reduce((acc, curr) => {

    }, )


    // const placesByCity = Object.keys(favoritesByCity).map((city) => {
    //   return [city, favoritesByCity[city]].flat()
    // })
    // console.log(placesByCity)

    // return placesByCity.map((place) => {
    //     return (
    //       place.map((elem)=> {
    //           console.log("WHO AM I?", elem)
    //           if(place.indexOf(elem) === 0) {
    //             <div>
    //              <h2>{elem}</h2>
    //             </div>
    //           } else {
    //             <div id={`${elem.placeName}`} className="saved-place-card">
    //               <img className="saved-image" src={Death} alt="death and co" />
    //               <p>{elem.placeName}</p>
    //             </div>
    //           }
    //           console.log("HERE I AM", elem.placeName)
    //       }
    //     )
    //   )
    // })
      // return (
      //   <Link
      //     to={`/${city}/${place.ninjaId}`}
      //     key={place.ninjaId}
      //     className="place-thumb"
      //   >
      //      <div id={`${place.ninjaId}`} className="saved-place-card">
      //       <img className="saved-image" src={Death} alt="death and co" />
      //       <p>{place.placeName}</p>
      //     </div>
      //   </Link>
      // );
    // });
  };
    // return Object.keys(favoritesByCity).map(city => {
    //   return (
    //     <div>
    //       <h2>{city}</h2>
    //     </div>
    //   )
    //   console.log("Butt", city)
    //   console.log("POOP", favoritesByCity[city])
    // })

    // return data.user.favorites.map((place) => {
    //   return (
    //     <Link
    //       to={`/${city}/${place.ninjaId}`}
    //       key={place.ninjaId}
    //       className="place-thumb"
    //     >
    //       <div id={`${place.ninjaId}`} className="saved-place-card">
    //         <img className="saved-image" src={Death} alt="death and co" />
    //         <p>{place.placeName}</p>
    //       </div>
    //     </Link>
    //   );
    // });
  // };

  return (
    <>
      <NavBar city={city} />
      <div className="saved-container">
        <h1 className="saved-title">Saved Places</h1>
        <div className="saved-places-container">{<DisplayUser />}</div>
      </div>
    </>
  );
};
export default SavedPlaces;
