import * as React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../ui/LoginButton';
// import LogoutButton from '../ui/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react'
import HomeDropdownMenuIcon from '../ui/HomeDropdownMenu';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { IconButton } from '@radix-ui/themes';

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-4">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start gap-10">
          <Link className="text-indigo-900 text-opacity-80" to="/">Home</Link>
          <Link className="text-indigo-900 text-opacity-80" to="/">About</Link>

          <IconButton>
            <Link to="/">
              <GitHubLogoIcon className="w-6 h-6 text-indigo-900 text-opacity-80" />
            </Link>
          </IconButton>

        </div>
      </div>
      <div className="flex items-center">
        {(isAuthenticated) ? <HomeDropdownMenuIcon /> : < LoginButton />}
      </div>
    </div>
  )
}

export default NavBar;
