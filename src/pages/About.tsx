import Footer from "../components/layout/Footer"
import NavBar from "../components/layout/NavBar"
import { GitHubLogoIcon, LinkedInLogoIcon} from '@radix-ui/react-icons'
import logo from "../assets/logo-horizontal-v2.png";
import logodark from "../assets/logo-horizontal-v2-darkmode.png";
import headshotkim from "../assets/team_headshots/other_dkim.jpg"
import dmurcia from "../assets/team_headshots/dmurcia_headshot.jpg"
import sheck from "../assets/team_headshots/sheck_headshot.jpg"
import dkim from "../assets/team_headshots/dkim_headshot.jpg"
import ytalab from "../assets/team_headshots/ytalab_headshot.jpg"

const About: React.FC = () => {
  return (
    <div className = "">
      <NavBar />
      <div className="mt-20 flex flex-col items-center">
        <header>
          <p className="text-center mb-5 text-indigo-900 text-opacity-70 text-4xl font-montserrat text-dark-mode">
            Meet the Team
          </p>
        </header>

        <div className="home-team-section">
                <div className="home-team-title">

                </div>
                        <div className="home-team-card-section">
                        <div className="home-team-card">
                        <img className = "mt-5 rounded-full w-24" src = {headshotkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat text-dark-mode">
                            Kurt Bulau
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 text-dark-mode-2"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {sheck}></img>
                        <h3 className="text-indigo-900 text-opacity-70  mt-4 text-large font-montserrat text-dark-mode">
                            Sam Heck
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 text-dark-mode-2"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                        <img className = "mt-5 rounded-full w-24" src = {dkim}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat text-dark-mode">
                            Daniel Kim
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 text-dark-mode-2"></GitHubLogoIcon>
                        </div>
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {dmurcia}></img>
                        <h3 className="text-indigo-900 text-opacity-70   mt-4 text-large font-montserrat text-dark-mode">
                            Danny Murcia
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70  mr-3 text-dark-mode-2"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70  text-dark-mode-2"></GitHubLogoIcon>
                        </div>
   
                    </div>
                    <div className="home-team-card">
                    <img className = "mt-5 rounded-full w-24" src = {ytalab}></img>
                        <h3 className="text-indigo-900 text-opacity-70  mt-4 text-large font-montserrat text-dark-mode">
                            Yahya Talab
                        </h3>
                        <div className= "flex flex-row mt-2">
                            <LinkedInLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"></LinkedInLogoIcon>
                            <GitHubLogoIcon width = {20} height = {20} className="text-indigo-900 text-opacity-70 text-dark-mode-2"></GitHubLogoIcon>
                        </div>
                    </div>
                    </div>
                    </div>


        {/* <div className="aboutus-container px-80 mt-20">
          <div className="border border-solid rounded-[20px] border-white border-opacity-40 flex gap-32">
            <div className="flex-column items-center  p-6">
              <div className="w-52 h-52">
                <img
                  className="h-52 w-52 object-cover rounded-full"
                  src="src/assets/devPhotos/Kurt.jpeg"
                />
              </div>
              <div className="mt-2">
                <p className="text-center text-xl text-indigo-900 mb-1">
                  Kurt Bulau
                </p>
                <p className="text-center text-xs text-indigo-950 -mt-1">
                  Software Engineer
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://github.com/kbulau">
                  <GitHubLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
              </div>
            </div>
            <div className="text-indigo-950 p-6">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutus-container px-80 mt-20">
          <div className="border border-solid rounded-[20px] border-white border-opacity-40 flex gap-32">
            <div className="flex-column items-center  p-6">
              <div className="w-52 h-52">
                <img
                  className="h-52 w-52 object-cover rounded-full"
                  src="src/assets/devPhotos/Kurt.jpeg"
                />
              </div>
              <div className="mt-2">
                <p className="text-center text-xl text-indigo-900 mb-1">
                  Kurt Bulau
                </p>
                <p className="text-center text-xs text-indigo-950 -mt-1">
                  Software Engineer
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://github.com/kbulau">
                  <GitHubLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
              </div>
            </div>
            <div className="text-indigo-950 p-6">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutus-container px-80 mt-20">
          <div className="border border-solid rounded-[20px] border-white border-opacity-40 flex gap-32">
            <div className="flex-column items-center  p-6">
              <div className="w-52 h-52">
                <img
                  className="h-52 w-52 object-cover rounded-full"
                  src="src/assets/devPhotos/Kurt.jpeg"
                />
              </div>
              <div className="mt-2">
                <p className="text-center text-xl text-indigo-900 mb-1">
                  Kurt Bulau
                </p>
                <p className="text-center text-xs text-indigo-950 -mt-1">
                  Software Engineer
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://github.com/kbulau">
                  <GitHubLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
              </div>
            </div>
            <div className="text-indigo-950 p-6">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutus-container px-80 mt-20">
          <div className="border border-solid rounded-[20px] border-white border-opacity-40 flex gap-32">
            <div className="flex-column items-center  p-6">
              <div className="w-52 h-52">
                <img
                  className="h-52 w-52 object-cover rounded-full"
                  src="src/assets/devPhotos/Kurt.jpeg"
                />
              </div>
              <div className="mt-2">
                <p className="text-center text-xl text-indigo-900 mb-1">
                  Kurt Bulau
                </p>
                <p className="text-center text-xs text-indigo-950 -mt-1">
                  Software Engineer
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://github.com/kbulau">
                  <GitHubLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
              </div>
            </div>
            <div className="text-indigo-950 p-6">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutus-container px-80 mt-20">
          <div className="border border-solid rounded-[20px] border-white border-opacity-40 flex gap-32">
            <div className="flex-column items-center  p-6">
              <div className="w-52 h-52">
                <img
                  className="h-52 w-52 object-cover rounded-full"
                  src="src/assets/devPhotos/Kurt.jpeg"
                />
              </div>
              <div className="mt-2">
                <p className="text-center text-xl text-indigo-900 mb-1">
                  Kurt Bulau
                </p>
                <p className="text-center text-xs text-indigo-950 -mt-1">
                  Software Engineer
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-2">
                <a href="https://github.com/kbulau">
                  <GitHubLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    className="text-indigo-900"
                  />
                </a>
              </div>
            </div>
            <div className="text-indigo-950 p-6">
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contributors-container mt-20 border w-[80vw] border-white border-opacity-10 rounded-[20px] pt-5 bg-white bg-opacity-10">
          <p className="text-center font-montserrat text-indigo-900 text-xl mt-2">Previous Contributors</p>
          <div className="grid grid-cols-5 mx-40 my-10">
            <div className="flex gap-2 m-2">
              <p className ="text-indigo-900 ">Kurt Bulau</p>
              <div className="flex gap-2 justify">
                <a href="https://github.com/kbulau">
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <img
                    className="h-5"
                    src="https://cdn.onlinewebfonts.com/svg/img_24651.png"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-2 m-2">
              <p className= "text-indigo-900" >Kurt Bulau</p>
              <div className="flex gap-2 justify">
                <a href="https://github.com/kbulau">
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <img
                    className="h-5"
                    src="https://cdn.onlinewebfonts.com/svg/img_24651.png"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-2 m-2">
              <p className= "text-indigo-900">Kurt Bulau</p>
              <div className="flex gap-2 justify">
                <a href="https://github.com/kbulau">
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <img
                    className="h-5"
                    src="https://cdn.onlinewebfonts.com/svg/img_24651.png"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-2 m-2">
              <p className= "text-indigo-900">Kurt Bulau</p>
              <div className="flex gap-2 justify">
                <a href="https://github.com/kbulau">
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <img
                    className="h-5"
                    src="https://cdn.onlinewebfonts.com/svg/img_24651.png"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-2 m-2">
              <p className= "text-indigo-900">Kurt Bulau</p>
              <div className="flex gap-2 justify">
                <a href="https://github.com/kbulau">
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a href="https://www.linkedin.com/in/kurt-bulau/">
                  <img
                    className="h-5"
                    src="https://cdn.onlinewebfonts.com/svg/img_24651.png"
                  />
                </a>
              </div>
            </div>
          </div> 
  </div> */ }
      </div>
      <Footer />
    </div>
  );
};

export default About