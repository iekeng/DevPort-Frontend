import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';
import PersonalDetails from '../components/PersonalDetails';
import Experience from '../components/Experience';
import Education from '../components/Education';

const PortfolioPage = () => {
  const [sectionNum, setSectionNum] = useState(1);
  const [experienceSectionNum, setExperienceSectionNum] = useState(1);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();
  const githubApi = useGithubApi();
  const navigate = useNavigate();
  
  const now = (step / 4) * 100;

  const handleNext = () => {
    setStep(step + 1);
  };
 
  const handlePrevious = () => {
    setStep(step - 1);
  };
 
  useEffect(() => {
    const handleGithubCallback = (async () => {
      const queryString = window.location.search;
      const response = await api.get('/oauth/callback', queryString);
      console.log(response)
      if(response.statusText === "OK") {
        localStorage.setItem('accessToken', response.data.token);
        githubApi.isAuthenticated ? console.log(localStorage.getItem('accessToken')) : console.log('nay');
      } else {
        return navigate('/SignUp')
      }
    })();

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 4800);

    return () => clearTimeout(timeout);

  }, [api, githubApi]);

  const handleAddSection = () => {
    setSectionNum(sectionNum + 1);
  };

  return (
    <>
      { githubApi.isAuthenticated ?
      <>
        <Container className="mb-5">
          {step === 0 && 
            <div className='mt-5 flex-grow'>
              <Button variant="dark" className='w-100 mt-5' onClick={handleNext} disabled={isLoading}>
                Proceed 
              </Button>
            </div>
          }
          {step > 0 && 
            <ProgressBar className="mb-2" now={now} label={`${Math.trunc(now)}%`}/>
          } 
          {step === 1 && 
            <PersonalDetails/>
          }
          { step === 2  && [...Array(sectionNum).keys()].map((_, index) => (
            <Education key={index}/>
          ))}
           {step === 3 && [...Array(experienceSectionNum).keys()].map((_, index) => (
             <Experience key={index}/>
          ))}
          {step !== 0 && !(step % 2) ? 
          <Button className="ms-2 mb-2" onClick={handleAddSection}>
            + Add Section
          </Button> : <></> }
          { step > 2 ?
          <Button className="ms-auto p-2" onClick={() => setExperienceSectionNum(experienceSectionNum + 1)} style={{background: 'none', border: 'none', color: 'black'}}>
            + Add Section
          </Button> : <></>}
          <div className="d-flex justify-content-end">
          {step > 1 && (
            <Button className="me-auto mb-4 mt-4" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step !== 0 && step < 4 && (
            <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleNext}>
              Next
            </Button>
          )} 
        </div>
        </Container> 
      </>:
      <>
        <div className="text-center">
          <Spinner />
        </div>
      </>
      }
      
    </>
  );
};

export default PortfolioPage;
