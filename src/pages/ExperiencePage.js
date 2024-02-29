import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import MultiFields from '../components/MultiFields';
import InputField from '../components/InputField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/DevPortApiProvider';

const ExperiencePage = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const api = useApi();
  
    const [formDataArray, setFormDataArray] = useState([{
        organisation: '',
        position: '',
        startDate: '',
        endDate: '',
        achievements: [],
        responsibilities: []
    }]);
    
    useEffect(() => {
      const setup = async () => {
        const response = await api.get(`/experience/${userId}`);
        const data = response.data;
        if (response.statusText === 'OK' && data.length > 0){
          console.log(response.data)
          setFormDataArray(response.data)
        }
      }

      setup();
    }, [])

    const handleNext = () => {
      navigate('/EducationPage');
    }

    const handleInputChange = (index, e) => {
        const {name, value} = e.target
        let newFormDataArray = [...formDataArray];
        newFormDataArray[index] = {
          ...newFormDataArray[index],
          [name]: value,
        };
        setFormDataArray(newFormDataArray);
      };

    const handleSubmit = async() => {
        try{
            if (userId){
                const response = await api.get(`/experience/${userId}`);
                if (response.data) {
                    for (const formData of formDataArray) {
                        console.log(formData)
                        if (formData._id){
                            await api.put(`/experience/${userId}/${formData._id}`, formData)
                        }
                        await api.post(`/experience/${userId}`, formData)
                    }
                }   
            }
        } catch(error) {
            console.log('Error submiting experiences.');
            console.log('Error: ', error);
        }
    }

    const handleAdd = () => {
        let formData = {
            organisation: '',
            position: '',
            startDate: '',
            endDate: '',
            achievements: [], 
            responsibilities: []
        }
        setFormDataArray([...formDataArray, formData])
    }

    return (
        <>
        <div className='mb-5 bottom-border'>
        <h5>Work Experience</h5>
        {formDataArray.map((formData, index) => (
            <div key={index}>
                <Form className="border border-gray-600 p-3 mb-3">
                        <Row>
                            <Col>
                                <InputField name={`organisation`} label="Organisation" placeholder="Organisation" value={formData.organisation} onChange={e => handleInputChange(index, e)}/>
                            </Col>
                            <Col>
                                <InputField name={`position`} label="Position" placeholder="Position" value={formData.position} onChange={e => handleInputChange(index, e)}/>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            <InputField name={`startDate`} type="date" label="Start Date" placeholder="Start Date" value={formData.startDate} onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        <Col>
                            <InputField name={`endDate`} type="date" label="End Date" placeholder="End Date" value={formData.endDate} onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        </Row>
                        
                        <p className='mb-0 mt-2'>Achievements:</p>
                        <MultiFields name="achievements" endpoint="/experience"/>
                        <p className='mb-0 mt-2'>Responsibilities:</p>
                        <MultiFields name="responsibility" endpoint="/experience"/>
                </Form>
            </div>
        ))
        }
          <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleAdd}>
            + Add Section
          </Button>
        
        <div className='d-flex mt-5 justify-content-around'>
          <Button   className="mb-4 mt-4 me-4 mb-5" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button   className="mb-4 mt-4 me-4 mb-5" variant="primary" onClick={handleNext}>
            Next
        </Button>
      </div>
      </div>
        </>
            );
        };
export default ExperiencePage;
 