import React, { useState, useRef } from 'react';
import arrowLeft from '../../../default-images/arrowLeft.png';
import arrowRight from '../../../default-images/arrowRight.png';

const CarouselComponent = ({ carModels }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);

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

    const handleMouseDown = (event) => {
        event.preventDefault();
        isDraggingRef.current = true;
        startXRef.current = event.clientX;
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        if (!isDraggingRef.current) return;
        const deltaX = event.clientX - startXRef.current;
        const threshold = 50; // Минимальное смещение, чтобы считаться прокруткой
        if (deltaX > threshold) {
            setCurrentSlide((prevSlide) =>
                prevSlide === 0 ? carModels[0].imagePaths.length - 1 : prevSlide - 1
            );
            startXRef.current = event.clientX;
        } else if (deltaX < -threshold) {
            setCurrentSlide((prevSlide) =>
                prevSlide === carModels[0].imagePaths.length - 1 ? 0 : prevSlide + 1
            );
            startXRef.current = event.clientX;
        }
    };

    const handleMouseUp = (event) => {
        event.preventDefault();
        isDraggingRef.current = false;
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
        <div
            style={{ position: 'relative' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={carouselRef}
        >
            <div style={arrowContainerStyle}>
                <button
                    onClick={handlePrev}
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={arrowLeft}
                        alt=""
                        style={{ ...arrowStyle, marginRight: '10px' }}
                    />
                </button>
                <button
                    onClick={handleNext}
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={arrowRight}
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
