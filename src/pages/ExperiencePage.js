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
        achievements: [], // Store achievements as an array
        responsibilities: [],
        user: userId,
    }]);
    
    useEffect(() => {
      const setup = async () => {
        const response = await api.get(`/experience/${userId}`);
        console.log(response)
      if (response){
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

    const handleSubmit =  async() => {
        try {
          let userId = localStorage.get('userId')
          let result = userId ? await api.get(`/experience/${userId}`) : null  
          console.log(result)
          if (result){
            result = userId ? await api.put(`/experience/${userId}`, formDataArray) : null ;
          } else {
            result = userId ? await api.post(`/experience/${userId}`, formDataArray) : null ;
            console.log(result)
          }
       } catch(error) {
        console.log(error)
       }
      }
    

    const handleAdd = () => {
        let formData = {
            organisation: '',
            position: '',
            startDate: '',
            endDate: '',
            achievements: [], 
            responsibilities: [],
            user: userId,
        }
        setFormDataArray([...formDataArray, formData])
        console.log(formDataArray.length)
    }

    return (
        <>
        <div className='mb-5 bottom-border'>
        <h5>Work Experience:</h5>
        {formDataArray.map((formData, index) => (
            <div key={index}>
                <Form className="border border-gray-600 p-3 mb-3">
                        <Row>
                            <Col>
                                <InputField name={`organisation-${index}`} label="Organisation" placeholder="Organisation" value={formData.organisation} onChange={e => handleInputChange(index, e)}/>
                            </Col>
                            <Col>
                                <InputField name={`position-${index}`} label="Position" placeholder="Position" value={formData.position} onChange={e => handleInputChange(index, e)}/>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            <InputField name={`startDate-${index}`} type="date" label="Start Date" placeholder="Start Date" value={formData.startDate} onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        <Col>
                            <InputField name={`endDate-${index}`} type="date" label="End Date" placeholder="End Date" value={formData.endDate} onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        </Row>
                        
                        <p className='mb-0 mt-2'>Achievements:</p>
                        <MultiFields name="achievements" />
                        <p className='mb-0 mt-2'>Responsibilities:</p>
                        <MultiFields name="responsibility"/>
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
 