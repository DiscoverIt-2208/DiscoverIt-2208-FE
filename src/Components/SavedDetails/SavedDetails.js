import "./SavedDetails.scss";
import { Link, useParams } from "react-router-dom";
import { GET_USER } from "../Queries";
import { DELETE_USER_FAVORITE } from "../Queries";
import { useMutation, useQuery } from "@apollo/client";
import NavBar from "../NavBar/NavBar";
import { FETCH_PLACE_DETAILS } from "../Queries";
import Death from "../assets/deathandco.jpg";

const SavedDetails = ({ city }) => {
  const { id } = useParams();

  const DisplaySavedPlace = () => {
    const { loading, error, data } = useQuery(FETCH_PLACE_DETAILS, {
      variables: {
        placeId: id,
      },
    });
    if (loading) return <p className="errorMessage">"Loading..."</p>;
    if (error) return <p className="errorMessage">Error: {error.message}</p>;

    const imageDis =
      data.placeDetails.imageData == null ? (
        <img className="detailsImage" src={Death} alt="Default!" />
      ) : (
        <img
          className="detailsImage"
          src={data.placeDetails.imageData}
          alt={data.placeDetails.name}
        />
      );

    return (
      <div className="detailsThumb" alt={data.placeDetails.name}>
        <h1 className="detailsTitle">{data.placeDetails.name}</h1>
        <DeleteUserFavorite />
        <div className="detailsInformation">
          {imageDis}
          <div className="information">
            <p className="infoText">Phone: {data.placeDetails.phone}</p>
            <p className="infoText">Hours: {data.placeDetails.hours}</p>
            <p className="infoText">Address: {data.placeDetails.address}</p>
            <p className="infoText">Website: {data.placeDetails.website}</p>
            <p className="infoText">
              Categories: {data.placeDetails.categories}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DeleteUserFavorite = () => {
    const [deleteUserFavorite, { loading, error }] = useMutation(
      DELETE_USER_FAVORITE,
      {
        variables: {
          userId: 1,
          placeId: id,
        },
        refetchQueries: [{ query: GET_USER }, "GetUser"],
      }
    );

    if (loading) console.log("Loading...");
    if (error) console.log(`Error: ${error.message}`);

    return (
      <Link to="/saved-places">
        <button
          className="delete-button"
          onClick={() => {
            deleteUserFavorite();
          }}
        >
          Delete
        </button>
      </Link>
    );
  };

  return (
    <>
      <NavBar />
      <div className="saved-details-page">
        <Link to={`/saved-places`} className="backButton">
          Back
        </Link>
        <DisplaySavedPlace />
      </div>
    </>
  );
};

export default SavedDetails;
