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
        <h1 className='city-name'>{cityName}</h1>
        <div className="buttons-container">
          <button className='category-button'>Restaurant</button>
          <button className='category-button'>Club</button>
          <button className='category-button'>Bar</button>
          <button className='category-button'>Event</button>
          <button className='category-button'>Mall</button>
        </div>
        <PlaceCard places={cityPlaces}/>
    </>
  )
}

export default Dashboard