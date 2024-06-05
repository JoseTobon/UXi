/*
import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ImageUploadModal from './components/ImageUploadModal';
import './App.css';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [predictText, setPredictText] = useState<string>('');

    const handleImageUpload = (image: File) => {
        setUploadedImage(URL.createObjectURL(image));
    };

    const handleProcessedImage = (imageSrc: string) => {
        setProcessedImage(imageSrc);
    };

    const handleTextPredict = (predictText: string) => {
        setPredictText(predictText);
    };

    const handleGetStartedClick = () => {
        setIsModalOpen(true);
    };

    const handleBackButtonClick = () => {
        setUploadedImage(null);
        setProcessedImage(null);
        setPredictText('');
    };

    const handleLogoClick = () => {
        setUploadedImage(null);
        setProcessedImage(null);
        setPredictText('');
        setIsModalOpen(false);
    };

    return (
        <div className="app">
            <Header onLogoClick={handleLogoClick} />

            {processedImage && predictText ? (
                <div className="results">
                    <img src={processedImage} alt="Processed" className="processed-image" />
                    <div className="predicted-text">Puntuacion: {predictText}</div>
                    <button className="back-button" onClick={handleBackButtonClick}>Back</button>
                </div>
            ) : (
                <>
                    {!uploadedImage && <MainContent onGetStartedClick={handleGetStartedClick} />}
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
                </>
            )}

            <ImageUploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onImageUpload={handleImageUpload} 
                onProcessedImage={handleProcessedImage}
                onTextPredict={handleTextPredict}
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
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [predictText, setPredictText] = useState<string>('');

    const handleImageUpload = (image: File) => {
        setUploadedImage(URL.createObjectURL(image));
    };

    const handleProcessedImage = (imageSrc: string) => {
        setProcessedImage(imageSrc);
    };

    const handleTextPredict = (predictText: string) => {
        setPredictText(predictText);
    };

    const handleGetStartedClick = () => {
        setIsModalOpen(true);
    };

    const handleBackButtonClick = () => {
        setUploadedImage(null);
        setProcessedImage(null);
        setPredictText('');
    };

    const handleNewUploadClick = () => {
        setIsModalOpen(true);
    };

    const handleLogoClick = () => {
        setUploadedImage(null);
        setProcessedImage(null);
        setPredictText('');
        setIsModalOpen(false);
    };

    return (
        <div className="app">
            <Header onLogoClick={handleLogoClick} />

            {/* Condicionalmente renderiza componentes */}
            {processedImage && predictText ? (
                <div className="results">
                    <img src={processedImage} alt="Processed" className="processed-image" />
                    <div className="predicted-text">Points: {predictText}</div>
                    <div className="buttons">
                        <button className="back-button" onClick={handleBackButtonClick}>Back</button>
                    </div>
                </div>
            ) : (
                <>
                    {!uploadedImage && <MainContent onGetStartedClick={handleGetStartedClick} />}
                    {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
                </>
            )}

            <ImageUploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onImageUpload={handleImageUpload} 
                onProcessedImage={handleProcessedImage}
                onTextPredict={handleTextPredict}
            />

            <Footer />
        </div>
    );
};

export default App;








