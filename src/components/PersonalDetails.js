import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import InputField from './InputField';
import Header from './Header';
import MultiFields from './MultiFields';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaTwitter, FaLinkedin,  } from "react-icons/fa";
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';

const PersonalDetails = () => {
  const api = useApi();
  const githubApi = useGithubApi();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const twitterRef = useRef();
  const linkedInRef = useRef();
  const summRef = useRef();

  

const [formData, setFormData] = useState({
    name: '',
    email: '',
    summary: '',
    phone: '',
    avatar_url: '',
    location: '',
    socials: {
        twitter: '',
        linkedIn: '',
        github: '',
    },
});

const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
    fetchPersonalDetailsFromGitHub();
    // handleSavePersonalDetails();
}, []);

const fetchPersonalDetailsFromGitHub = async () => {
  try {
      let response;
      
      if (githubApi.isAuthenticated) {
        response = await githubApi.get('/user');
      }

    const userData = response.data;
        
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      socials: {
        twitter: userData.twitter_username,
        linkedIn: userData.blog,
        github: userData.html_url,
      },
      avatar_url: userData.avatar_url,
      location: userData.location,
    });

    console.log(response)

  } catch (error) {
      console.error('Error fetching personal details from GitHub: ', error.message);
  }
};

const handleSavePersonalDetails = async () => {
  let response;

  let updatedDetails = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    socials: {
      twitter: formData.socials.twitter,
      linkedIn: formData.socials.linkedIn,
    },
  };

  try{
    response = await api.post('/users', updatedDetails);
    console.log(response)
    const userId = response.data._id.toString();
    localStorage.setItem('userId', userId);
    setIsEditing(false);
   
  } catch(error){
    console.error('Error updating personal details', error);
  }
};

const handleEditClick = () => {
    setIsEditing(true);
};

const handleSaveClick = () => {
    handleSavePersonalDetails();
};

  return (
    <>
      //Force email to lower case in the form
      <h5>Details</h5>
      <Form className="border border-gray-600 p-4 mb-3">
        <InputField name="name" label="Full Name" placeholder="Last Name, First Name" fieldRef={nameRef} />
        <InputField name="summary" as="textarea" label="Summary" placeholder="Personal Summary" rows={3} fieldRef={summRef}/>
        <Row>
          <Col>
            <InputField name="email" label="Email" type="email" placeholder="Email Address" fieldRef={emailRef} />
          </Col>
          <Col>
            <InputField name="phone" label="Phone" type="text" placeholder="Phone Number" fieldRef={phoneRef} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="twitter" label={<FaTwitter size={20}/>} placeholder={"X handle"} fieldRef={twitterRef} />
          </Col>
          <Col>
            <InputField name="linkedin" label={<FaLinkedin size={20}/>} placeholder="LinkedIn URL" fieldRef={linkedInRef} />
          </Col>
        </Row>
      </Form>
      <h5>Soft Skills</h5>
      <MultiFields name="soft" />
      <h5>Technical Skills</h5>
      <MultiFields name="technical" />

    </> 
    );
};

export default PersonalDetails;
