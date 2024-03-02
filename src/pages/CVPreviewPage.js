import React, { useState, useEffect } from 'react';
import {useApi} from '../contexts/DevPortApiProvider'
import Button from 'react-bootstrap/Button';

function CVPreview() {
  const api = useApi();
  const userId = localStorage.getItem('userId');
  const [pdfUrl, setPdfUrl] = useState(null);

  const pdfDownload = async( ) => {
    await api.downloadFile(`/generate-cv/${userId}`, `${userId}-cv.pdf`);
  }

  useEffect(() => {
    const fetchPdf = async () => {
      const userId = localStorage.getItem('userId');
      const response = await api.get(`/generate-cv`);

      if (response.statusText === 'OK') {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } else {
        console.error('Failed to fetch PDF');
      }
    };

    fetchPdf();
  }, []);

  return (
    <>
      <div>
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="400px" />}
      </div>
      <a href={`${process.env.REACT_APP_API_URL}/generate-cv/${userId}`} className="mt-5" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="dark" className='w-100 mt-5' disabled={userId ? false : true}>
            Download CV
          </Button>
        </a>
      </>
  );
}

export default CVPreview; 