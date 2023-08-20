import * as React from 'react';

import NavBar from '../components/layout/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ui/Loading';


const Home: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) navigate('/dashboard')

  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Home;