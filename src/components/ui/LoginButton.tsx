import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@radix-ui/themes';


const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button className="text-gray-100 border border-white border-opacity-70 bg-indigo-900 bg-opacity-50 rounded-lg" onClick={() => loginWithRedirect()}>Log In</Button>;
}

export default Login;



