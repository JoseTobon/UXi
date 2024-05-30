/*import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
};

export default App;

34567823

import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ImageUploadModal from './components/ImageUploadModal';
import './App.css';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleImageUpload = (image: File) => {
        setUploadedImage(URL.createObjectURL(image));
    };

    const handleGetStartedClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="app">
            <Header />
            <MainContent onGetStartedClick={handleGetStartedClick} />
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
            <ImageUploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onImageUpload={handleImageUpload} 
            />
            <Footer />
        </div>
    );
};

export default App;

*/

import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ImageUploadModal from './components/ImageUploadModal';
import './App.css';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleImageUpload = (image: File) => {
        setUploadedImage(URL.createObjectURL(image));
    };

    const handleGetStartedClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="app">
            <Header />
            {!uploadedImage && <MainContent onGetStartedClick={handleGetStartedClick} />}
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
            <ImageUploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onImageUpload={handleImageUpload} 
            />
            <Footer />
        </div>
    );
};

export default App;







