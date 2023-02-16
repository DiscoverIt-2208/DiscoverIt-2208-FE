import React from 'react'
import './BadURL.scss'
import { Link } from 'react-router-dom'

const BadURL = () => {
    return (
        <div className='badURL-container'>
            <h2 className='badURL-title'>You are on the wrong page!<p>Please click the button below to go back home.</p></h2>
            <Link to='/'><button className='home-button'>HOME</button></Link>
        </div>
    )
}

export default BadURL