import React from 'react';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import PortfolioPage from './pages/PortfolioPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PortfolioPage" element={<PortfolioPage />} /> 
        </Routes>
      </Router>
  );
}

export default App;