import React from 'react';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import PortfolioPage from './pages/PortfolioPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ApiProvider from './contexts/DevPortApiProvider';
import GithubApiProvider from './contexts/GithubApiProvider';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <Router>
        <Header />
        <ApiProvider>
        <GithubApiProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/PortfolioPage" element={<PortfolioPage />} /> 
          </Routes>
        </GithubApiProvider>
        </ApiProvider>
        <Footer />
      </Router>
  );
}

export default App;