import * as React from 'react';
import { useEffect } from 'react';

import NavBar from '../components/layout/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/Loading';

import MetricsView from '../components/layout/MetricsView';
import { Container } from '@radix-ui/themes';


const Home: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate])

  return (
    <div>
      <NavBar />

    </div>
  )
}

export default Home;