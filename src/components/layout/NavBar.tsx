import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import HomeDropdownMenuIcon from '../ui/HomeDropdownMenu';
import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Switch } from '@radix-ui/react-switch';
import useAppStore from '../../store/appStore';
import DarkModeToggle from '../ui/DarkModeToggle';

const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { setView, theme, toggleTheme } = useAppStore();

  return (
    <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-4">
      <div className="flex flex-col items-center md:flex-row gap-10">
          <Link className="text-indigo-900 text-opacity-80 text-dark-mode-2" to="/">Home</Link>
          <Link className="text-indigo-900 text-opacity-80 text-dark-mode-2" to="/about">About</Link>
        </div>
        <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start gap-6">
        <DarkModeToggle></DarkModeToggle>
        {/* <Switch checked={theme === 'dark'} onChange={toggleTheme} >
          {theme === 'light' ? <MoonIcon className = "text-indigo-900"width={22} height={22} /> : <SunIcon width={22} height={22} />}
        </Switch> */}
          <IconButton>
            <Link to="/">
              <GitHubLogoIcon className="w-6 h-6 text-indigo-900 text-opacity-80 text-dark-mode-2" />
            </Link>
          </IconButton>
        {(isAuthenticated) ? <HomeDropdownMenuIcon /> : <button className="rounded-lg font-normal mr-1  ml-1 bg-gray-500 bg-opacity-10 text-indigo-900 text-dark-mode-2" onClick={() => loginWithRedirect()}>Log In</button>}
      </div>
    </div>
  )
}

export default NavBar;
