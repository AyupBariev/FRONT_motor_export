import React from 'react';

const SpaceDigitComponent = ({ digits }) => {
    const formattedPrice = digits.toLocaleString('ru-RU'); // Используйте свой языковой код здесь, если требуется другая локализация

    return <span>{formattedPrice}</span>;
}

export default SpaceDigitComponent;
