import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Logo from '../../assets/images/logo.png'
import Loader from 'react-loaders'


const Home = () => {
    return (
        <>
            <div className='container home-page'>
                <img src={Logo} alt='logo' />
                <div>
                    <SearchBar />
                </div>
            </div>
            <Loader type='ball-scale-multiple' />
        </>
    )
}

export default Home