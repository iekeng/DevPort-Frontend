import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Education from '../components/Education';
import { FaPlusSquare as Plus }  from "react-icons/fa";
import Footer from '../components/Footer';
import PersonalDetails from '../components/PersonalDetails';
import Experience from '../components/Experience';
import Spinner from 'react-bootstrap/Spinner'
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';

const PortfolioPage = () => {
  const [sectionNum, setSectionNum] = useState(1);
  const [experienceSectionNum, setExperienceSectionNum] = useState(1);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const api = useApi();
  const githubApi = useGithubApi();
  
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
      localStorage.setItem('accessToken', response.data.token);
      githubApi.isAuthenticated ? console.log('yay') : console.log('nay');
    })();
  }, [api]);

  const handleAddSection = () => {
    setSectionNum(sectionNum + 1);
    
  };

  return (
    <>
      { localStorage.getItem('accessToken') ?
      <>
        <Container>
          <ProgressBar className="mb-2" now={now} label={`${Math.trunc(now)}%`}/>
          {step === 1 && 
            <PersonalDetails/>
          }
          { step === 2  && [...Array(sectionNum).keys()].map((_, index) => (
            <Education key={index}/>
          ))}
           {step === 3 && [...Array(experienceSectionNum).keys()].map((_, index) => (
             <Experience key={index}/>
          ))}
          {!(step % 2) ? 
          <Button className="ms-2 mb-2" onClick={handleAddSection}>
            + Add Section
          </Button> : <></> }
          { step > 2 ?
          <Button className="ms-auto p-2" onClick={() => setExperienceSectionNum(experienceSectionNum + 1)} style={{background: 'none', border: 'none', color: 'black'}}>
            + Add Section
          </Button> : <></>}
          <div className="d-flex justify-content-around">
          {step > 1 && (
            <Button className="me-auto mb-4 mt-4" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleNext}>
              Next
            </Button>
          )} 
          { step &&
            <Button className="mb-4 mt-4" variant="primary" type="submit">
              Submit
            </Button>
          }
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
