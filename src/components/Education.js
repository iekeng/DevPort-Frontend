import React, { useState, useRef } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import InputField from './InputField';
import Form from 'react-bootstrap/Form'
import Footer from './Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Education({title}) {
    const [formData, setFormData] = useState([{
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        location: '',
        user: '',
    }]);

    // const [educationDetails, setEducationDetails] = useState([]); // To store multiple education details
    // const [isAdding, setIsAdding] = useState(false);

    const institutionRef = useRef()
    const courseRef = useRef()
    const degreeRef = useRef()
    const locationRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()

    // const saveEducationDetails = async (data) => {
    //     try {            
    //         //get userid from DevPort api client and its api provider
    //         // const userId = localStorage.getItem('userId');
    //         if (!userId){
    //             console.error('User ID not found in localStorage');
    //             return;
    //         }

    //         // Add the userId to the request data
    //         data.userId = userId;

    //         const response = await axios.post(`http://localhost:4000/education/${userId}`, data, {
              
    //         });

    //         if (response.status === 201) {
    //             console.log('Education details saved successfully');
    //         }
    //         onSave('Skills');
    //     } catch (error) {
    //         console.error('Error saving education details', error);
    //     }
    // };

    // const handleSaveEducationDetails = async (event) => {
    //     event.preventDefault();
    //     saveEducationDetails(formData);
    //     setEducationDetails([...educationDetails, formData]); // Save the current education details
    //     setFormData({
    //         institution: '',
    //         degree: '',
    //         course: '',
    //         startDate: '',
    //         endDate: '',
    //         location: '',
    //         user: user,
    //     });
    //     // setIsAdding(false);
    // };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const addAnotherForm = () => {
    //     setIsAdding(true);
    // };

    // const cancelAddForm = () => {
    //     setIsAdding(false);
    // };

    return (
        <>
        <Container>
            <div className='fs2 pt-2'>
                {title && <h1>Education Section</h1>}
            </div>
            <Form className="border border-gray-600 p-3 mb-3">
                <InputField name="institution" label="Institution" placeholder="Institution" fieldRef={institutionRef} onChange={handleInputChange}/>
                
                <InputField name="location" label="City" placeholder="City" locationRef={locationRef} onChange={handleInputChange}/>
                <Row>
                  <Col>
                    <InputField name="course" label="Course" placeholder="Course" fieldRef={courseRef} onChange={handleInputChange}/>
                  </Col>
                  <Col>
                    <InputField name="degree" label="Degree" placeholder="Degree" fieldRef={degreeRef} onChange={handleInputChange}/>
                  </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField name="startDate" label="Start Date" placeholder="Start Date" type="date" fieldRef={startDateRef} onChange={handleInputChange}/>
                    </Col>
                    <Col>
                        <InputField name="endDate" label="End Date" placeholder="End Date" type="date" fieldRef={endDateRef} onChange={handleInputChange}/>
                    </Col>
                </Row>
            </Form>
        </Container>
        </>
        // <div>
        // <main>
        //     <form id="education-form" onSubmit={handleSaveEducationDetails}>
        //         <section id="education-details">
        //             <div className="content-container">
        //                 <div className="content">
        //                     <div className="label-input-pair">
        //                         <label htmlFor="institution-input" className="label">Institution</label>
        //                         <input type="text" id="institution-input" className="nav-content"  name="institution" value={formData.institution} onChange={handleInputChange} />
        //                     </div>
        //                     <div className="label-input-pair">
        //                         <label htmlFor="degree-input" className="label">Degree</label>
        //                         <input type="text" id="degree-input" className="nav-content" name="degree" value={formData.degree} onChange={handleInputChange} />
        //                     </div>
        //                     <div className="label-input-pair">
        //                         <label htmlFor="course-input" className="label">Course</label>
        //                         <input type="text" id="course-input" className="nav-content" name="course" value={formData.course} onChange={handleInputChange} />
        //                     </div>
        //                     <div className="dates">
        //                         <div className="label-input-pair">
        //                             <label htmlFor="startDate-input" className="label">Start Date</label>
        //                             <input type="date" id="startDate-input" className="nav-content" name="startDate" value={formData.startDate} onChange={handleInputChange} />
        //                         </div>
        //                         <div className="label-input-pair">
        //                             <label htmlFor="endDate-input" className="label">End Date</label>
        //                             <input type="date" id="endDate-input" className="nav-content" name="endDate" value={formData.endDate} onChange={handleInputChange} />
        //                         </div>
        //                     </div>
        //                     <div className="label-input-pair">
        //                         <label htmlFor="location-input" className="label">Location</label>
        //                         <input type="text" id="location-input" className="nav-content" name="location" value={formData.location} onChange={handleInputChange} />
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //         <button type="submit" className='LSbutton' >Save</button>
            
        //     <section id="education-list" >
        //         <section>
        //         <div className="content-container">
        //             <div className="content">
        //     {isAdding && (
        //                 <div className="content-container">
        //                     {/* Display the form for adding new education details */}
        //                     <div className="content">
        //                         <div className="label-input-pair">
        //                             <label className="label">Institution</label>
        //                             <input
        //                                 type="text"
        //                                 className="nav-content"
        //                                 name="institution"
        //                                 value={formData.institution}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </div>
        //                         <div className="label-input-pair">
        //                             <label className="label">Course</label>
        //                             <input
        //                                 type="text"
        //                                 className="nav-content"
        //                                 name="course"
        //                                 value={formData.course}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </div>
        //                         {/* <div className="label-input-pair">
        //                             <label className="label">Degree</label>
        //                             <input
        //                                 type="text"
        //                                 className="nav-content"
        //                                 name="degree"
        //                                 value={formData.degree}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </div> */}
        //                         <div className="dates">
        //                             <div className="label-input-pair">
        //                                 <label className="label">Start Date</label>
        //                                 <input
        //                                     type="date"
        //                                     className="nav-content"
        //                                     name="startDate"
        //                                     value={formData.startDate}
        //                                     onChange={handleInputChange}
        //                                 />
        //                             </div>
        //                             <div className="label-input-pair">
        //                                 <label className="label">End Date</label>
        //                                 <input
        //                                     type="date"
        //                                     className="nav-content"
        //                                     name="endDate"
        //                                     value={formData.endDate}
        //                                     onChange={handleInputChange}
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className="label-input-pair">
        //                             <label className="label">Location</label>
        //                             <input
        //                                 type="text"
        //                                 className="nav-content"
        //                                 name="location"
        //                                 value={formData.location}
        //                                 onChange={handleInputChange}
        //                             />
        //                         </div>
        //                         <div className="add-form-buttons">
        //                         <button type="submit" className='LSbutton' style={{ display: 'block', margin: '5px auto' }}>Save</button>
        //                         <button type="button" className='LSbutton' onClick={cancelAddForm} style={{ display: 'block', margin: '0 auto'}}>Cancel</button>
        //                     </div>
        //                 </div>
        //             </div>       
        //             )}
        //             </div>
        //         </div>
        //         </section>
                
        //     </section>
        //     </form>
        // </main>
        // {!isAdding && (
        //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        //             <button type="button" id='add-button' className='LSbutton' onClick={addAnotherForm}>+</button>
        //           </div>
                  
        //         )}
        // </div>
    );
};
