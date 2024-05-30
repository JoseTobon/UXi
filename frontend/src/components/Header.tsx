import React from 'react';
import './Header.css';
import logo from '../assets/logo.png'; // Ajusta la ruta según la ubicación de tu imagen

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
        </header>
    );
};

export default Header;


