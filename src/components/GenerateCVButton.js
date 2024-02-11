import React from 'react';
import axios from 'axios';
import Footer from './Footer';

const GenerateCVButton = ({ onSave }) => {
  const userId = localStorage.getItem('userId');

  const generateCVApiUrl = `http://localhost:4000/generate-cv/${userId}`;

  const handleGenerateCV = async () => {
    try {
      const response = await axios.get(generateCVApiUrl, null, {

        responseType: 'blob', // Indicate that the response is a binary blob (e.g., a file)
      });

      // if (response.status === 200) {
      //   const blob = new Blob([response.data], { type: response.headers['content-type'] });
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = 'DevPort CV.pdf'; // Set the desired filename
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      // } else {
      //   console.error('CV generation failed.');
      // }
    } catch (error) {
      console.error('Error generating CV:', error);
    }
  };

  return (
    <div>
    <button
      id="generate-cv-button"
      type="button"
      className="LSbutton"
      onClick={handleGenerateCV}
      style={{ font: 'black', display: 'block' }}
    >
      Download CV
    </button>
    <Footer />
    </div>
  );
};

export default GenerateCVButton;
