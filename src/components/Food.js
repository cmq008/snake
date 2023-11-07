import React from 'react';

const Food = ({ foodDot, onFoodEaten }) => {
  return (
    <div
      className="food-dot"
      style={{
        left: `${foodDot[0]}px`,
        top: `${foodDot[1]}px`,
      }}
    ></div>
  );
};

export default Food;
