import { useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth0 } from "@auth0/auth0-react";

import {
  HamburgerMenuIcon,
  BarChartIcon,
  CircleBackslashIcon,
} from '@radix-ui/react-icons';



const HomeDropdownMenuIcon = () => {
  const navigate = useNavigate();

  function handleNavigateDashboard() {
    navigate('/dashboard');
  }

  const { logout } = useAuth0();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Customize options"
        >
          <HamburgerMenuIcon className="text-indigo-900 text-opacity-70 hamburger-menu-text" width={25} height={25} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white bg-opacity-50 mr-1 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item onClick={handleNavigateDashboard} className="group text-[13px] leading-none text-indigo-900 text-opacity-80 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-900 data-[highlighted]:text-violet1 hamburger-menu-text">
            Dashboard

            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8 text-dark-mode">
              <BarChartIcon />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="group text-[13px] leading-none text-indigo-900 text-opacity-80 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-900 bg-opacity-80 data-[highlighted]:text-violet1 hamburger-menu-text">
            Logout
            <div className="ml-auto pl-[20px] text-indigo-900 text-opacity-80 group-data-[highlighted]:text-white group-data-[disabled]:text-violet1 text-dark-mode">
              <CircleBackslashIcon />
            </div>

          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};


export default HomeDropdownMenuIcon;