import React, {useState, useRef, useEffect} from 'react';
import arrowLeft from '../../../default-images/arrowLeft.png';
import arrowRight from '../../../default-images/arrowRight.png';

const CarouselComponent = ({carModels}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        const carousel = carouselRef.current;
        const handleTransitionEnd = () => {
            // Сбрасываем флаг перетаскивания после завершения перехода
            isDraggingRef.current = false;
            // Удаляем обработчик события, чтобы избежать его вызова для последующих переходов
            carousel.removeEventListener('transitionend', handleTransitionEnd);
        };
        carousel.addEventListener('transitionend', handleTransitionEnd);

        return () => {
            carousel.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, []);

    const handleNext = (event) => {
        event.preventDefault();
        if (!isDraggingRef.current) {
            setCurrentSlide((prevSlide) =>
                prevSlide === carModels.imagePaths.length - 1 ? 0 : prevSlide + 1
            );
        }
    };

    const handlePrev = (event) => {
        event.preventDefault();
        if (!isDraggingRef.current) {
            setCurrentSlide((prevSlide) =>
                prevSlide === 0 ? carModels.imagePaths.length - 1 : prevSlide - 1
            );
        }
    };

    const handleTouchStart = (event) => {
        event.preventDefault();
        isDraggingRef.current = true;
        startXRef.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        event.preventDefault();
        if (!isDraggingRef.current) return;
        const deltaX = event.touches[0].clientX - startXRef.current;
        const threshold = 50; // Минимальное смещение, чтобы считаться прокруткой
        if (deltaX > threshold) {
            setCurrentSlide((prevSlide) =>
                prevSlide === 0 ? carModels.imagePaths.length - 1 : prevSlide - 1
            );
            startXRef.current = event.touches[0].clientX;
        } else if (deltaX < -threshold) {
            setCurrentSlide((prevSlide) =>
                prevSlide === carModels.imagePaths.length - 1 ? 0 : prevSlide + 1
            );
            startXRef.current = event.touches[0].clientX;
        }
    };

    const handleTouchEnd = (event) => {
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
        zIndex: '1'
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
        transition: 'transform 0.3s ease',
        transform: `translateX(-${currentSlide * 100}%)`,
    };

    const handleMouseEnter = (event) => {
        event.target.style.opacity = '0.4';
        event.target.style.backgroundColor = '#fff';
    };

    const handleMouseLeave = (event) => {
        event.target.style.opacity = '1';
        event.target.style.backgroundColor = 'transparent';
    };

    const carouselContainerStyle = {
        height: '100%',
        width: '100%'
    };

    return (
        <div
            style={{position: 'relative', height: '100%', overflow: 'hidden'}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={carouselRef}
        >
            <div style={arrowContainerStyle}>
                <button
                    onClick={handlePrev}
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={arrowLeft} alt="" style={{...arrowStyle, marginRight: '10px'}}/>
                </button>
                <button
                    onClick={handleNext}
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={arrowRight} alt="" style={{...arrowStyle, marginLeft: '4px'}}/>
                </button>
            </div>
            <div style={carouselContainerStyle}>
                <div style={{display: 'flex', transition: 'transform 0.3s ease', height: '100%'}}>
                    {carModels.imagePaths.map((imagePath, index) => (
                        <img
                            key={index}
                            className="LazyImage__image"
                            src={process.env.REACT_APP_URL + '/' + imagePath}
                            alt={`Image ${index}`}
                            style={imageStyle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
