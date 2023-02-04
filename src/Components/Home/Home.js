import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Logo from '../../assets/images/logo.png'

const Home = () => {
    return (
        <div className='home-container'>
            <div className='logo-container'>
                <img src={Logo} alt='logo' />
            </div>
        </div>
    )
}

export default Home