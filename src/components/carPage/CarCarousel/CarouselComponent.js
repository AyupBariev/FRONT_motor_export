import React, { useState } from 'react';

const CarouselComponent = ({ carModels }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = (event) => {
        event.preventDefault();
        setCurrentSlide((prevSlide) =>
            prevSlide === carModels[0].imagePaths.length - 1 ? 0 : prevSlide + 1
        );
    };

    const handlePrev = (event) => {
        event.preventDefault();
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? carModels[0].imagePaths.length - 1 : prevSlide - 1
        );
    };

    const arrowContainerStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    };

    const arrowStyle = {
        width: '30px',
        height: '30px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    };

    const buttonStyle = {
        width: '50px',
        height: '160px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    };

    const imageStyle = {
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
    };

    const handleMouseEnter = (event) => {
        event.target.style.opacity = '0.4';
        event.target.style.backgroundColor = '#fff';
    };

    const handleMouseLeave = (event) => {
        event.target.style.opacity = '1';
        event.target.style.backgroundColor = 'transparent';
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={arrowContainerStyle}>
                <button onClick={handlePrev} style={buttonStyle} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                    <img
                        src={process.env.REACT_APP_APP_URL + '/images/arrowLeft.png'}
                        alt=""
                        style={{ ...arrowStyle, marginRight: '10px' }}
                    />
                </button>
                <button onClick={handleNext} style={buttonStyle} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                    <img
                        src={process.env.REACT_APP_APP_URL + '/images/arrowRight.png'}
                        alt=""
                        style={{ ...arrowStyle, marginLeft: '4px' }}
                    />
                </button>
            </div>
            <img
                className="LazyImage__image"
                src={carModels[0].imagePaths[currentSlide]}
                alt={`Image ${currentSlide}`}
                style={imageStyle}
            />
        </div>
    );
};

export default CarouselComponent;
