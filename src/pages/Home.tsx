import * as React from 'react';

import NavBar from '../components/layout/NavBar';
import { useAuth0 } from '@auth0/auth0-react';


const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Home;