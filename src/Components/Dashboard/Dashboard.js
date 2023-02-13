import React, { useEffect } from "react";
import "./Dashboard.scss";
import PlaceCard from "../PlaceCard/PlaceCard";
import NavBar from "../NavBar/NavBar";
import SampleData from "../sampleData/samplePlaces";

const Dashboard = ({ city, places, setPlaces }) => {
  useEffect(() => {
    setPlaces(SampleData[0].places);
  }, [places, city]);

  return (
    <>
      <NavBar city={city} />
      <h1 className="city-name">{city}</h1>
      <div className="buttons-container">
        <button className="category-button">Restaurant</button>
        <button className="category-button">Club</button>
        <button className="category-button">Bar</button>
        <button className="category-button">Event</button>
        <button className="category-button">Mall</button>
      </div>
      <div className="place-card-box">
        <div className="place-card">
          <PlaceCard places={places} city={city} />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
