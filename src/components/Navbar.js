import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import "./Navbar.scss"
import { useState } from 'react';
function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false);

    const handleClick = () => {
        console.log(toggleMenu);
        toggleMenu ? setToggleMenu(false) : setToggleMenu(true)
    }


    return (
        <div className={`nav  ${toggleMenu && "show"}`}>

            <img className='nav__logo' alt='VirusScanner' />

            <nav className='nav__actions'>
                <a href='/' className='nav__action'>Developer</a>
                <a href='/' className='nav__action'>Other</a>
                <a href='/' className='nav__action'>Contact</a>
            </nav>
            <button className='nav__burger' onClick={handleClick}><MenuIcon /></button>
        </div>

    )
}

export default Navbar