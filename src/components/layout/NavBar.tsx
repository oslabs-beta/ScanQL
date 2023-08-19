import * as React from 'react';

import { Link } from 'react-router-dom';
import LoginButton from '../ui/LoginButton';
import LogoutButton from '../ui/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react'

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-4">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
         <Link className = "text-indigo-800" to="/">Home</Link>
        </div>
        <div className="flex flex-col items-center md:flex-row md:space-x-4">
          {isAuthenticated ? <Link className = "text-indigo-800" to="/dashboard">Dashboard</Link> : null}
        </div>
      </div>
      <div className="flex items-center">
        {/* <Switch size="1" radius="full" defaultChecked />
        <MoonIcon />
        <DropdownMenuDemo /> */}
        {/* <Link className = "text-indigo-800" to="/login">Login</Link> */}
        {(isAuthenticated) ? < LogoutButton /> : < LoginButton />}
      </div>
    </div>
  )
}

export default NavBar;

{/* <Link to="/">Home</Link> */}
{/* <Link to="/dashboard">Dashboard</Link> */}
{/* <Link to="/login">Login</Link> */}
