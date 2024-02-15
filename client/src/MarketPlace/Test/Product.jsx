import React from 'react';

const Product = ({ showNotification }) => {
  const handleButtonClick = () => {
    showNotification("This is a notification from Product component!");
  };

  return (
    <div>
      <h2>Product Component</h2>
      <button onClick={handleButtonClick}>Show Notification</button>
    </div>
  );
};

export default Product;
