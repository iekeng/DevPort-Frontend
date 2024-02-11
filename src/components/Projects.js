import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

const Projects = ({ onSave }) => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [liveUrl, setLiveUrl] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserProjectDetails();
  }, []);

  const fetchUserProjectDetails = async () => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    try {
      const userReposUrl = 'https://api.github.com/user/repos';
      const userReposResponse = await axios.get(userReposUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (userReposResponse.status === 200) {
        const userProjects = userReposResponse.data;
        console.log('Projects fetched successfully!');

        // Filter projects with GitHub Pages
        const projectsWithPages = userProjects.filter(project => project.has_pages);
        setProjectDetails(projectsWithPages);

        if (projectsWithPages.length > 0) {
          // Select the first project by default
          handleProjectSelect(projectsWithPages[0]);

          // Set the Live URL using the desired format
          setLiveUrl(`https://${userProjects[0].owner.login}.github.io/${projectsWithPages[0].name}`);
        }
      }
    } catch (error) {
      console.error('Error fetching project details', error);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);

    // Update the Live URL when a project is selected
    setLiveUrl(`https://${project.owner.login}.github.io/${project.name}`);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveProjectDetails = async () => {
    console.log('saveProjectDetails function called');
    try {
          const userId = localStorage.getItem('userId');
          console.log('UserId:', userId);
              const projectData = {
                  name: selectedProject.name,
                  repoURL: selectedProject.html_url,
                  liveURL: liveUrl,
                  description: selectedProject.description,
              };
              console.log('Project data:', projectData);
              
          const response = await axios.post(`http://localhost:4000/project/${userId}`, projectData);

          if (response.status === 201) {
            console.log('Project details saved successfully');
            console.log('Project details saved:', selectedProject);
            onSave('GenerateCVButton');
            toggleEditMode();
          } else {
            console.log('Failed to save project details. Unexpected response status:', response.status);
          }
  } catch (error) {
      console.error('Error saving project details:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  }  

  const handleDescriptionChange = (event) => {
    setSelectedProject((prevProject) => ({
      ...prevProject,
      description: event.target.value,
    }));
  }

  return (
    <div>
    <main>
      <section id="project-details" className="center-content">
        <div className="center-content">
          <div className="content">
            <div>
              {editMode ? (
                <form style={{ marginTop: '20px' }}>
                  <div className="label-input-pair">
                    <label htmlFor="projectName-input" className="label">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName-input"
                      className="nav-content"
                      name="name"
                      value={selectedProject.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="label-input-pair">
                    <label htmlFor="projectName-input" className="label">
                      Repository
                    </label>
                    <input
                      type="text"
                      id="repository"
                      className="nav-content"
                      name="html_url"
                      value={selectedProject.html_url}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="label-input-pair">
                    <label htmlFor="liveURL-input" className="label">
                      Live URL
                    </label>
                    <input
                      type="text"
                      id="liveURL-input"
                      className="nav-content"
                      name="liveUrl"
                      value={liveUrl}
                      onChange={(event) => setLiveUrl(event.target.value)}
                    />
                  </div>
                  <div className="label-input-pair">
                    <label htmlFor="description-input" className="label">
                      Description
                    </label>
                    <textarea
                      id="description-input"
                      className="nav-content"
                      name="description"
                      value={selectedProject.description}
                      onChange={handleDescriptionChange}
                      // required
                    />
                  </div>
                  <button type="submit" className="LSbutton" onClick={saveProjectDetails} style={{ margin: '10px' }}>
                    Save
                  </button>
                  <button type="submit" className="LSbutton" onClick={toggleEditMode}>
                    Cancel
                  </button>
                </form>
              ) : (
                 // Display project details when not in edit mode
                 <div>
                 <ul style={{ listStyle: 'none', fontSize: '15px', padding: 0, display: 'flex' }}>
                     {projectDetails.map((project, index) => (
                         <li key={index} style={{ marginBottom: 0, paddingRight: '10px'}}>
                             <button type='submit' className='LSbutton' onClick={() => handleProjectSelect(project)}>{project.name}</button>
                         </li>
                     ))}
                 </ul>
                 
             </div>
         )}
     </div>
 </div>
</div>
{selectedProject && !editMode && (
 <div className="center-content">
     <div className="content">
         <div className="label-input-pair" ><span className="label">Project Name</span><br /><span className="nav-content" id="projectName">{selectedProject.name}</span></div>
         <div className="label-input-pair"><span className="label">Repository</span><br /><span className="nav-content" id="repository"><a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer">{selectedProject.html_url}</a></span></div>
         <div className="label-input-pair"><span className="label">Live URL</span><br /><span className="nav-content" id="liveURL"><a href={liveUrl} target="_blank" rel="noopener noreferrer">{liveUrl}</a></span></div>
         <div className="label-input-pair"><span className="label">Description</span><br /><span className="nav-content" id="description">{selectedProject.description}</span></div>
     </div>
     <button type='submit' className='LSbutton' onClick={toggleEditMode}>Edit</button>
 </div>
)}
</section>
</main>
<Footer />
</div>
  );
};

export default Projects;
