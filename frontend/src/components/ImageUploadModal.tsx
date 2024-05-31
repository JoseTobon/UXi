
import React, { useState } from 'react';
import './ImageUploadModal.css';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageUpload: (image: File) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        if (!selectedImage) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch("http://54.160.161.1:5000/predict", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            onImageUpload(selectedImage);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Upload Image</h2>
                <label className="file-upload-label" htmlFor="file-upload">
                    Choose File
                    <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                {preview && <img src={preview} alt="Preview" className="image-preview" />}
                <div className="buttons">
                    <button className="upload-btn" onClick={handleSubmit}>Upload</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;


