/*import React from 'react';

const MainContent: React.FC = () => {
    return (
        <main className="main-content">
            <div className="intro">
                <h1>Click, analyze, and master any web design with UXi.</h1>
                <button className="get-started">Get Started</button>
            </div>
        </main>
    );
};

export default MainContent;
*/
/*
import React from 'react';


interface MainContentProps {
    onGetStartedClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onGetStartedClick }) => {
    return (
        <main className="main-content">
            <div className="intro">
                <h1>Click, analyze, and master any web design with UXi.</h1>
                <button className="get-started" onClick={onGetStartedClick}>Get Started</button>
            </div>
        </main>
    );
};

export default MainContent;

*/

import React from 'react';
import './MainContent.css';
import photo from '../assets/photo.svg'; // Ajusta la ruta según sea necesario

interface MainContentProps {
    onGetStartedClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onGetStartedClick }) => {
    return (
        <main className="main-content">
            <div className="image-section">
                <img src={photo} alt="Example" />
            </div>
            <div className="text-section">
                <h1>Click, analyze, and master any web design with UXi.</h1>
                <button className="get-started" onClick={onGetStartedClick}>Get Started</button>
            </div>
        </main>
    );
};

export default MainContent;


