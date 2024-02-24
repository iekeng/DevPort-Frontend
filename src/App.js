import React from 'react';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import PortfolioPage from './pages/PortfolioPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ApiProvider from './contexts/DevPortApiProvider';
import GithubApiProvider from './contexts/GithubApiProvider';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <Router>
        <Header />
        <ApiProvider>
        <GithubApiProvider>
        <Container>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ExperiencePage" element={<ExperiencePage/>} />
            <Route path="/EducationPage" element={<EducationPage />} />
            <Route path="/PersonalDetailsPage" element={<PersonalDetailsPage />} />
            <Route path="/PortfolioPage" element={<PortfolioPage />} /> 
            <Route path="*" element={<LandingPage />} /> 
          </Routes>
        </Container>
        </GithubApiProvider>
        </ApiProvider>
        <Footer />
      </Router>
  );
}

export default App;