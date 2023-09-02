import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="home-footer-section px-60 h-80">
      <div className="flex justify-evenly flex-end content-end pt-16">
        <div className="">
          <h3 className="text-xl text-indigo-900 text-opacity-80 font-montserrat">Community</h3>
          <ul>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s">
                GitHub
              </a>
            </li>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s mt-">
                Linkedin
              </a>
            </li>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s">
                Medium
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-xl text-indigo-900 text-opacity-80 font-montserrat">Navigation</h3>
          <ul>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s">
                Home
              </a>
            </li>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s">
                About Us
              </a>
            </li>
            <li className="pt-2">
              <a href="" className="text-gray-100 text-s">
                App
              </a>
            </li>
          </ul>
        </div>
        {/* <div>
          <p></p>
        </div> */}
      </div>
      <div className="pt-16">
        <div className="border-t py-6">
          <p className="text-xs text-center text-indigo-950">© 2023 ScanQL | MIT License</p>
        </div>
      </div>
    </div>
  );
}

export default Footer