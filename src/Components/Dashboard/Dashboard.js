import React, { useEffect, useState } from 'react';
import './Dashboard.scss'
import PlaceCard from '../PlaceCard/PlaceCard';
import NavBar from '../NavBar/NavBar';
import SampleData from '../../sampleData/samplePlaces.js';

const Dashboard = () => {
  const [cityPlaces, setCityPlaces] = useState([])
  const [cityName, setCityName] = useState("")

  useEffect(() => {
    setCityPlaces(SampleData[0].places)
    setCityName(SampleData[0].name)
  }, [cityPlaces, setCityPlaces, cityName, setCityName])

  return (
    <>
      <NavBar />
        <h1>{cityName}</h1>
        <div className="buttons-container">
          <button>Restaurant</button>
          <button>Club</button>
          <button>Bar</button>
          <button>Event</button>
          <button>Mall</button>
        </div>
        <PlaceCard places={cityPlaces}/>
    </>
  )
}

export default Dashboard