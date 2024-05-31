/*

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
*/
/*
import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import './MainContent.css';
import photo from '../assets/photo.svg'; // Asegúrate de ajustar la ruta de la imagen

interface MainContentProps {
    onGetStartedClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onGetStartedClick }) => {
    return (
        <Grid container spacing={2} className="main-content">
            <Grid item xs={12} md={6} className="image-section">
                <img src={photo} alt="Example" />
            </Grid>
            <Grid item xs={12} md={6} className="text-section">
                <Typography variant="h1">Click, analyze, and master any web design with UXi.</Typography>
                <Button variant="contained" color="primary" className="get-started" onClick={onGetStartedClick}>
                    Get Started
                </Button>
            </Grid>
        </Grid>
    );
};

export default MainContent;
*/

import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import './MainContent.css';
import photo from '../assets/photo.svg'; // Asegúrate de ajustar la ruta de la imagen

interface MainContentProps {
    onGetStartedClick: () => void;
}


const MainContent: React.FC<MainContentProps> = ({ onGetStartedClick }) => {
    return (
        <Grid container className="main-content">
            <Grid item xs={12} md={6} className="image-section">
                <img src={photo} alt="Example" />
            </Grid>
            <Grid item xs={12} md={6} className="text-section">
                <Grid item xs={12} md={6} className="text-section">
                    <Typography variant="h4" component="h1" className="title">
                        Click, analyze, and master any web design with UXi.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className="text-section">
                    <Button variant="contained" color="primary" className="get-started" onClick={onGetStartedClick}>
                        Get Started
                    </Button>
                </Grid>
                
            </Grid>
        </Grid>

    );
};

export default MainContent;

