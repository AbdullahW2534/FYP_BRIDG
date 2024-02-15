import React from 'react';

const SubmittedData = ({ formData }) => {
  return (
    <div>
      <h2>Submitted Data</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Message: {formData.message}</p>
    </div>
  );
};

export default SubmittedData;
