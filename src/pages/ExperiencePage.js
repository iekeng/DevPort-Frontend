import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import MultiFields from '../components/MultiFields';
import InputField from '../components/InputField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const ExperiencePage = () => {
    const userId = localStorage.getItem('userId');
    const [isHidden, setIsHidden] = useState(true);
    const [formDataArray, setFormDataArray] = useState([{
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        achievements: [], // Store achievements as an array
        responsibilities: '',
        userId: userId,
    }]);
    const [isAdding, setIsAdding] = useState(false);

    const toggleDetails = () => {
        setIsHidden(!isHidden);
    };

    const saveWorkDetails = async (data) => {
    //     // Ensure that data.achievements is an array
    //     const splitAchievements = Array.isArray(data.achievements)
    //         ? data.achievements
    //         : data.achievements.split('\n').map(item => item.trim());
    
    //     try {
    //         const postData = {
    //             ...data,
    //             achievements: splitAchievements, // Update the achievements field
    //             user: userId,
    //         };

    //         data.userId = userId;
    //         const response = await axios.post(`http://localhost:4000/experience/${userId}`, data, {});
            
    //         if (response.status === 200) {
    //             console.log('Work details saved successfully');
    //         }
    //         onSave('Projects');
    //     } catch (error) {
    //         console.error('Error saving work details', error);
    //     }
    };

    const handleSaveWorkDetails = async (event) => {
        // event.preventDefault();
        // saveWorkDetails(formData);
        // setIsHidden(true);
        // setIsAdding(false);
    };

    const handleChange = (event) => {
        // const { name, value } = event.target;
    
        // if (name === 'achievements') {
        //     // Handle achievements as a string (text area input)
        //     setFormData({
        //         ...formData,
        //         [name]: value,
        //     });
        // } else {
        //     setFormData({
        //         ...formData,
        //         [name]: value,
        //     });
        // };
    };  

    const addAnotherForm = () => {
        setIsAdding(true);
    };

    const cancelAddForm = () => {
        setIsAdding(false);
    };

    const handleSubmit = async () => {
        //get all user experience by id
        // const experiences = await api.get(`/experience/${userId}`)
        // if (!experiences || experiences.length === 0){
        //     //make post
        //     api.post(`/experience/${userId}`, data)
        // } else {
        //     //make put
        //     api.put(`/experience/${userId}`, data)
        // }

    }

    const handleAdd = () => {
        setFormDataArray(...formDataArray, {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            achievements: [],
            responsibilities: '',
            userId: userId,
        })
    }

    return (
    //     <div>
    //     <main>
    //         <section id="workexperience-details">
    //             <div className="content-container">
    //                 <div className="content">
    //                     <form id="workexperience-form" onSubmit={handleSaveWorkDetails}>
    //                         <div className="label-input-pair">
    //                             <label htmlFor="company" className="label">Company</label>
    //                             <input
    //                                 type="text"
    //                                 id="company"
    //                                 className="nav-content"
    //                                 name="company"
    //                                 value={formData.company}
    //                                 onChange={handleChange}
    //                             />
    //                         </div>
    //                         <div className="label-input-pair">
    //                             <label htmlFor="position" className="label">Position</label>
    //                             <input
    //                                 type="text"
    //                                 id="position"
    //                                 className="nav-content"
    //                                 name="position"
    //                                 value={formData.position}
    //                                 onChange={handleChange}
    //                             />
    //                         </div>
    //                         <div className="dates">
    //                             <div className="label-input-pair">
    //                                 <label htmlFor="startDate" className="label">Start Date</label>
    //                                 <input
    //                                     type="date"
    //                                     id="startDate"
    //                                     className="nav-content"
    //                                     name="startDate"
    //                                     value={formData.startDate}
    //                                     onChange={handleChange}
    //                                 />
    //                             </div>
    //                             <div className="label-input-pair">
    //                                 <label htmlFor="endDate" className="label">End Date</label>
    //                                 <input
    //                                     type="date"
    //                                     id="endDate"
    //                                     className="nav-content"
    //                                     name="endDate"
    //                                     value={formData.endDate}
    //                                     onChange={handleChange}
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="label-input-pair">
    //                             <label htmlFor="achievements" className="label">Achievement</label>
    //                             <textarea
    //                                 className="nav-content"
    //                                 name="achievements"
    //                                 placeholder='- Enter your achievements in a list format...'
    //                                 value={formData.achievements}
    //                                 onChange={handleChange}
    //                             />
    //                         </div>
    //                         <div className="label-input-pair">
    //                             <label htmlFor="responsibilities" className="label">Responsibilities</label>
    //                             <textarea
    //                                 className="nav-content"
    //                                 name="responsibilities"
    //                                 placeholder='- Enter your responsibilities in a list format...'
    //                                 value={formData.responsibilities}
    //                                 onChange={handleChange}
    //                             />
    //                         </div>
    //                         <button id="save-button" type="submit" className='LSbutton' onClick={toggleDetails}>
    //                             Save
    //                         </button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </section>
    //         <section id="workexperience-list" className="content-container">
    //             <section className="content-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    //                 <div className="content-container">
    //                     <div className="content-container">
    //                         {isAdding && (
    //                             <div className="label-input-pair">
    //                                 {/* Display the form for adding new work experience details */}
    //                                 <form id="workexperience-form" onSubmit={handleSaveWorkDetails}>
    //                                     <div className="label-input-pair">
    //                                         <label className="label">Company</label>
    //                                         <input
    //                                             type="text"
    //                                             className="nav-content"
    //                                             name="company"
    //                                             value={formData.company}
    //                                             onChange={handleChange}
    //                                         />
    //                                     </div>
    //                                     <div className="label-input-pair">
    //                                         <label className="label">Position</label>
    //                                         <input
    //                                             type="text"
    //                                             className="nav-content"
    //                                             name="position"
    //                                             value={formData.position}
    //                                             onChange={handleChange}
    //                                         />
    //                                     </div>
    //                                     <div className="dates">
    //                                         <div className="label-input-pair">
    //                                             <label className="label">Start Date</label>
    //                                             <input
    //                                                 type="date"
    //                                                 className="nav-content"
    //                                                 name="startDate"
    //                                                 value={formData.startDate}
    //                                                 onChange={handleChange}
    //                                             />
    //                                         </div>
    //                                         <div className="label-input-pair">
    //                                             <label className="label">End Date</label>
    //                                             <input
    //                                                 type="date"
    //                                                 className="nav-content"
    //                                                 name="endDate"
    //                                                 value={formData.endDate}
    //                                                 onChange={handleChange}
    //                                             />
    //                                         </div>
    //                                     </div>
    //                                     <div className="label-input-pair">
    //                                         <label className="label">Achievement</label>
    //                                         <textarea
    //                                             className="nav-content"
    //                                             name="achievements"
    //                                             placeholder='- Enter your achievements in a list format...'
    //                                             value={formData.achievements.join('\n')}
    //                                             onChange={handleChange}
    //                                         />
    //                                     </div>
    //                                     <div className="label-input-pair">
    //                                         <label className="label">Responsibilities</label>
    //                                         <textarea
    //                                             className="nav-content"
    //                                             name="responsibilities"
    //                                             placeholder='- Enter your responsibilities in a list format...'
    //                                             value={formData.achievements.join('\n')}
    //                                             onChange={handleChange}
    //                                         />
    //                                     </div>
    //                                     <div className="add-form-buttons">
    //                                         <button type="submit" className='LSbutton' style={{ display: 'block', margin: '0 auto' }}>
    //                                             Save
    //                                         </button>
    //                                         <button type="button" className='LSbutton' onClick={cancelAddForm} style={{ display: 'block', margin: '10px auto' }}>
    //                                             Cancel
    //                                         </button>
    //                                     </div>
    //                                 </form>
    //                             </div>
    //                         )}
    //                     </div>
    //                 </div>
    //             </section>
    //         </section>
    //     </main>
    //      {!isAdding && (
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
    //         <button type="button" id='add-button' className='LSbutton' onClick={addAnotherForm}>+</button>
    //       </div>
          
    //    )}

    //    </div>
  <>
  
  {formDataArray.map((formData, index) => (
    <Form>
        <div key={index}>
            <InputField name="position" label="Position" placeholder="Position" value={formData.position}/>
            <Row>
            <Col>
                <InputField name="startDate" type="date" label="Start Date" placeholder="Start Date" value={formData.startDate}/>
            </Col>
            <Col>
                <InputField name="endDate" type="date" label="End Date" placeholder="End Date" value={formData.endDate}/>
            </Col>
            </Row>
            
            <h3>Achievements:</h3>
            <MultiFields name="achievements" />
            <p className='fs-6'>Responsibilities:</p>
            <MultiFields name="responsibility"/>
        </div>
    </Form>))}

  <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleAdd}>
    + Add Section
  </Button>

  </>
     );
 };

export default ExperiencePage;
 