import React from "react";

function PhotoList({ photos, onPhotoDelete }) {
    return (
        <div className="file-preview-list">
            {photos.map((photo, index) => (
                <div className="file-preview-item-list" key={index}>
                    <img src={URL.createObjectURL(photo)} alt={`photo-${index}`} />
                    <div
                        className="delete"
                        onClick={() => onPhotoDelete(index)}
                        title="Delete"
                    >
                        &times;
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PhotoList;
