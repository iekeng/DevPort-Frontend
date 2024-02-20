import React, { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import MultiFields from './MultiFields';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

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

  

const [formData, setFormData] = useState({});

const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
    fetchPersonalDetailsFromGitHub()
   
  // handleSavePersonalDetails();
}, []);

const fetchPersonalDetailsFromGitHub = async() => {
  let userData
  let response;
  try {
      if (githubApi.isAuthenticated) {
        response = await githubApi.get('/user');
      }
      userData = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        socials: {
          twitter: `https://twitter.com/${response.data.twitter_username}`,
          linkedIn: response.data.blog,
          github: response.data.html_url,
        },
        avatar_url: response.data.avatar_url,
        location: response.data.location,
      }
  } catch (error) {
    console.error('Error fetching personal details from GitHub: ', error.message);
  }
  setFormData(userData)
  console.group(userData)
  console.group(formData)
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
    avatar_url: formData.avatar_url,
    location: formData.location
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
        <InputField name="name" label="Full Name" placeholder="Last Name, First Name"/>
        <InputField name="summary" as="textarea" label="Summary" placeholder="Personal Summary" rows={3}/>
        <Row>
          <Col>
            <InputField name="email" label="Email" type="email" placeholder="Email Address" />
          </Col>
          <Col>
            <InputField name="phone" label="Phone" type="text" placeholder="Phone Number"/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="twitter" label={<FaTwitter size={20}/>} placeholder={"X handle"}/>
          </Col>
          <Col>
            <InputField name="linkedin" label={<FaLinkedin size={20}/>} placeholder="LinkedIn URL"/>
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
