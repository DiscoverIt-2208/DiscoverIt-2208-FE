import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetails.scss";
import NavBar from "../NavBar/NavBar";
import { GET_USER } from "../Queries";
import { CREATE_USER_FAVORITE } from "../Queries";
import { FETCH_PLACE_DETAILS } from "../Queries";
import Death from "../assets/deathandco.jpg";

const PlaceDetails = ({ city }) => {
  const { id } = useParams();

  const DisplayPlace = () => {
    const { loading, error, data } = useQuery(FETCH_PLACE_DETAILS, {
      variables: {
        placeId: id,
      },
    });
    if (loading) return <p className="errorMessage">"Loading..."</p>;
    if (error) return <p className="errorMessage">Error: {error.message}</p>;

    const imageDis = !data.placeDetails.imageData ? (
      <img className="detailsImage" src={Death} alt="Default" />
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
        <CreateUserFavorite dataDetails={data.placeDetails} />
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

  const CreateUserFavorite = ({ dataDetails }) => {
    const [createUserFavorite, { data, loading, error }] = useMutation(
      CREATE_USER_FAVORITE,
      {
        variables: {
          userId: 1,
          placeId: id,
          placeName: dataDetails.name,
          thumbnailUrl: `${dataDetails.imageData}`,
          city: city.properties.city,
          state: city.properties.state,
          country: city.properties.country,
          address: dataDetails.address,
        },
        refetchQueries: [{ query: GET_USER }, "GetUser"],
      }
    );

    if (loading) console.log("Submitting...");
    if (error) console.log(`Submission error! ${error.message}`);
    if (data) console.log(data);

    return (
      <Link to="/saved-places">
        <button
          className="detailsButtons"
          onClick={(e) => {
            createUserFavorite();
          }}
        >
          Save
        </button>
      </Link>
    );
  };

  return (
    <>
      <NavBar city={city.properties.city} />
      <div className="detailsPage">
        <Link to={`/dashboard`} className="backButton">
          Back
        </Link>
        <DisplayPlace />
      </div>
    </>
  );
};

export default PlaceDetails;
