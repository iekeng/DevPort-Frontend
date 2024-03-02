import React, { useState, useEffect, useRef} from 'react';
import InputField from '../components/InputField';
import MultiFields from '../components/MultiFields';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import { NavLink, Spinner } from 'react-bootstrap';

import { FaTwitter, FaLinkedin,  } from "react-icons/fa";
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';
import { useNavigate } from 'react-router-dom';

const PersonalDetailsPage = () => {
  const api = useApi();
  const githubApi = useGithubApi();
  const navigate = useNavigate();
  const initialFormData = {
    name: '',
    email: '',
    summary: '',
    socials: {
      twitter: '',
      linkedIn: '',
      github: '',
    },
    phone: '',
    avatar_url: '',
    location: '',
    __v: 0,
    _id: ''
  }
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let response;
    let result;
    let data;
    let temp;

    const createUser = async(data) => {
        response = await api.post('/user', data);
        console.log(response)
        const {_id} = response;
        let userId = _id;
        console.log(userId);
        localStorage.setItem('userId', userId);
    }

    const emailValidation = async(email) => {
      try {
        let result = await api.get('/user', `?email=${email}`);
        console.log(result.data)
        if (result.statusText === 'OK'){
          const userId = result.data._id
          localStorage.setItem('userId', userId);
          return result;
        }
        return result;
      } catch (error) {
        console.error(error)
      }
    }

    const fetchPersonalDetailsFromGitHub = async() => {
      setIsLoading(true);
      if (githubApi.isAuthenticated) {
        try {
          const user = await githubApi.get('/user');
          const userMail = user.data.email
          console.log(userMail)
          response = await emailValidation(userMail);
          if (response.data) {
            data = response.data;
            console.log(response)
            temp = {
              name: data.name,
              email: data.email,
              summary: data.summary,
              socials: {
                twitter: data.twitter_username,
                linkedIn: data.blog,
                github: data.html_url,
              },
              phone: data.phone,
              avatar_url: data.avatar_url,
              location: data.location
            }
            setFormData(temp);
          } else if (!response.data) {
            data = user.data;
            const formData = {
              name: data.name,
              email: data.email,
              summary: data.bio || '',
              socials: {
                twitter: data.twitter_username || '',
                linkedIn: data.blog || '',
                github: data.html_url,
              },
              phone: data.phone || '',
              avatar_url: data.avatar_url || '',
              location: data.location || ''
            }
            console.log(formData)
            await createUser(formData);
            setFormData(formData);
          }
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false);
          console.log(localStorage.getItem('userId'))
        }
      }
    }

    fetchPersonalDetailsFromGitHub();
  }, [githubApi]);

  const handleSubmit =  async() => {
    try {
      let userId = localStorage.getItem('userId')
      let result = userId ? await api.put(`/user/${userId}`, formData) : null  
      console.log(result)
   } catch(error) {
    console.log(error)
   }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    navigate('/ExperiencePage');
  }

  return (
    <>
    {!isLoading ?
    <div>
      <div className='mb-5'>
      <h5>Details</h5>
      <Form className="border border-gray-600 p-4 mb-3">
        <InputField name="name" label="Full Name" placeholder="Last Name, First Name" value={formData.name} onChange={e => handleChange(e)}/>
        <InputField  name="summary" as="textarea" label="Summary" placeholder="Personal Summary" rows={3} value={formData.summary} onChange={e => handleChange(e)}/>
        <Row>
          <Col>
            <InputField name="email" label="Email" type="email" placeholder="Email Address" value={formData.email} onChange={e => handleChange(e)}/>
          </Col>
          <Col>
            <InputField name="phone" label="Phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={e => handleChange(e)}/>
          </Col>
        </Row>
        <Row> 
          <Col>
            <InputField name="twitter" label={<FaTwitter size={20}/>} placeholder={"X handle"} value={formData.socials.twitter} onChange={e => handleChange(e)}/>
          </Col>
          <Col>
            <InputField name="linkedin" label={<FaLinkedin size={20}/>} placeholder="LinkedIn URL" value={formData.socials.linkedIn} onChange={e => handleChange(e)}/>
          </Col>
        </Row>
      </Form>
      {!isLoading && localStorage.getItem('userId') ?
      <>
        <h5>Soft Skills</h5>
        <MultiFields name="soft_skills" endpoint="/skill"/>
        <h5>Technical Skills</h5>
        <MultiFields name="technical_skills" endpoint="/skill" />
      </> : <></> }
      <div className='d-flex mt-5 justify-content-around'>
        <Button   className=" mt-4 me-4 mb-5" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button   className=" mt-4 me-4 mb-5" variant="primary" onClick={handleNext}>
          Next
      </Button>
      </div>
    </div>
    </div> :
    <div className='text-center mt-5'>
      <Spinner />
    </div> }
    </>
  );
};

export default PersonalDetailsPage;
