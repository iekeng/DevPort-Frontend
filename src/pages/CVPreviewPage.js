import Button from 'react-bootstrap/Button';

function CVPreview() {
  const userId = localStorage.getItem('userId');
  // const [pdfUrl, setPdfUrl] = useState(null);

  // useEffect(() => {
  //   const fetchPdf = async () => {
  //     const response = await api.get(`/generate-cv`);

  //     if (response.statusText === 'OK') {
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       setPdfUrl(url);
  //     } else {
  //       console.error('Failed to fetch PDF');
  //     }
  //   };

  //   fetchPdf();
  // }, [api]);

  return (
    <>
      <div>
        {/* {pdfUrl && <iframe src={pdfUrl} width="100%" height="400px" />} */}
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