import React, { useState } from 'react';

const CarouselComponent = ({ carModels }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide === carModels[0].imagePaths.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? carModels[0].imagePaths.length - 1 : prevSlide - 1));
    };

    return (
        <div>
            <button onClick={handlePrev}>Previous</button>
            <img src={carModels[0].imagePaths[currentSlide]} alt={`Image ${currentSlide}`} />
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default CarouselComponent;
