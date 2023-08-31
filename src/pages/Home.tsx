import * as React from 'react';
import { useEffect } from 'react';
import logo from '../assets/logo-horizontal-v2.png';

import NavBar from '../components/layout/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/Loading';

import MetricsView from '../components/layout/MetricsView';
import { Container } from '@radix-ui/themes';
import Footer from '../components/layout/Footer';


const Home: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) navigate('/dashboard');
  // }, [])

  return (
    <div>
      <NavBar />
      <div className = 'home-logo-container'>
      <img className='home-logo-nav' src={logo}></img>
      </div>
      <div className="home-cards-section">Cards</div>
      <div className="home-gif1-section">Gif1</div>
      <div className="home-gif2-section">Gif2</div>
      <div className="home-gif3-section">Gif3</div>
      <Footer/>
    </div>
  )
}

export default Home;