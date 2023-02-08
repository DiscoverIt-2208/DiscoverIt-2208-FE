import React from 'react'
import './Dashboard.scss'
import PlaceCard from '../PlaceCard/PlaceCard';
import NavBar from '../NavBar/NavBar';

const Dashboard = () => {
  return (
    <>
      <NavBar />
        <div className="place-card-container">
          <PlaceCard />
        </div>
    </>
  )
}

export default Dashboard