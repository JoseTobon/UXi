/*
import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
    return (
        <header className="header">
            <div className="logo" onClick={onLogoClick}>
                <img src={logo} alt="Logo" />

            </div>
        </header>
    );
};

export default Header;

*/

import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
    return (
        <header className="header">
            <div className="logo" onClick={onLogoClick}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-title">UXi</div>
        </header>
    );
};

export default Header;



