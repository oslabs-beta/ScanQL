import React from 'react'
import useAppStore from '../../store/appStore';
import logo from "../../assets/logo-horizontal-v2.png";
import logodark from "../../assets/logo-horizontal-v2-darkmode.png";


const Footer: React.FC = () => {

    const { theme } = useAppStore();

  return (
    <div className="home-footer-section px-60 h-80">
      <div className="flex justify-evenly flex-end content-end pt-16 ml-40">
        <div className="">
          <h3 className="text-xl text-indigo-900 text-opacity-80 text-dark-mode">
            Navigation
          </h3>
          <ul>
            <li className="pt-2">
              <a href="" className="text-gray-200 text-s text-dark-mode-2">
                Home
              </a>
            </li>
            <li className="pt-2">
              <a href="" className="text-gray-200 text-s text-dark-mode-2">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
        {theme === "light" ? (
                        <img className="w-60 h-auto mt-6" src={logo}></img>
                    ) : (
                        <img className="w-60 h-auto mt-6" src={logodark}></img>
                    )}
        </div>
        <div className="">
          <h3 className="text-xl text-indigo-900 text-opacity-80 text-dark-mode">Community</h3>
          <ul>
            <li className="pt-2">
              <a href="https://github.com/oslabs-beta/ScanQL" target='_blank' className="text-gray-200 text-s text-dark-mode-2">
                GitHub
              </a>
            </li>
            <li className="pt-2">
              <a href="https://medium.com/@danielmurcia_40019/introducing-scanql-a-database-query-optimization-tool-86ad5ac69d9d" target='_blank' className="text-gray-200 text-s text-dark-mode-2">
                Medium
              </a>
            </li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <div className="pt-16">
        <div className="border-t py-6">
          <p className="text-xs text-center text-indigo-950 footer-text">© 2023 ScanQL | MIT License</p>
        </div>
      </div>
    </div>
  );
}

export default Footer