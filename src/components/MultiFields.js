import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlusSquare as Plus } from 'react-icons/fa';
import { useGithubApi } from '../contexts/GithubApiProvider';
import { useApi } from '../contexts/DevPortApiProvider';


const MultiFields = ({ endpoint, value}) => {
  const devportApi = useApi();
  const githubApi = useGithubApi();
  const [formDataArray, setFormDataArray] = useState([{fieldValue: ''}]);
  const userId = localStorage.getItem('userId');
  console.log(userId);
  const apiKey = value;

  const handleAddField = () => {
    setFormDataArray([...formDataArray, {fieldValue:''}])
  }

  const handleRemoveField = () => {
    let newFormDataArray = [...formDataArray];
    newFormDataArray.splice(-1, 1);
    setFormDataArray(newFormDataArray);
  }

  const handleChange = (i, e) => {
    let newFormDataArray = [...formDataArray];
    newFormDataArray[i][e.target.name] = e.target.value;
    setFormDataArray(newFormDataArray);
  }
  

  const handleSubmit = async () => {
    try {
      const response = await devportApi.get(`${endpoint}/${userId}`);
      if(!response){
        await devportApi.post(`${endpoint}/${userId}`, {apiKey: [...formDataArray]})
      } else {
        await devportApi.put(`${endpoint}/${userId}`, {apiKey: [...formDataArray]})
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    if (githubApi.isAuthenticated) {
      endpoint === '/skills' && fetchSkillsFromGitHubRepos();
    }
  }, []);

  const fetchSkillsFromGitHubRepos = async () => {
    try {
      const userReposResponse = await githubApi.get('/user/repos');


      const userRepos = userReposResponse.data;
      const uniqueLanguages = new Set();
      const fetchPromises = [];

      for (const repo of userRepos) {
        const languagesUrl = repo.languages_url;
        fetchPromises.push(await githubApi.get(languagesUrl))
      }

      // Fetch languages for all repositories in parallel
      const repoLanguagesResponses = await Promise.all(fetchPromises);

      for (const response of repoLanguagesResponses) {
        if (response.status === 200) {
          const repoLanguages = Object.keys(response.data);
          repoLanguages.forEach((language) => uniqueLanguages.add(language));
        }
      }

      // setSkills(Array.from(uniqueLanguages));
      
    } catch (error) {
      console.error('Error fetching skills from GitHub repositories', error);
    }
  };

  // const saveLanguagesToDB = async () => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     const response = await axios.post(`http:localhost:4000/skill/${userId}`, {
  //       skills: skills,
  //     });
  //     if (response.status === 201) {
  //       console.log('Skills saved to DB');
  //       onSave('WorkExperience');
  //     }
  //   } catch (error) {
  //     console.error('Error saving skills to DB', error);
  //   }
  // };

  // const handleAddSection = () => {
  //   setSectionNum(sectionNum + 1);
  // };
  
  return (
    <>
    <div className="mx-auto mb-2">
      <div className='d-flex flex-row flex-wrap justify-content-start'>
        {formDataArray.map((formData, index) => (
          <div className='mx-2' key={index}>
            <InputField name={value} type="text" placeholder="..." value={formData.formValue} onChange={ e => handleChange(index, e)}/>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <Button className="py-1" onClick={handleSubmit}>Save</Button>
        <div className='ms-auto'>
          {formDataArray.length > 1 && 
          <Button className=" p-2" onClick={handleRemoveField} style={{background: 'none', border: 'none', color: 'black'}}>- field</Button>}
          <Button className=" p-2" onClick={handleAddField} style={{background: 'none', border: 'none', color: 'black'}}>+ field</Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MultiFields;