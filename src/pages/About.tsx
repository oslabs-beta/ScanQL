import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import kbulau from "../assets/team_headshots/kbulau_headshot.png";
import dmurcia from "../assets/team_headshots/dmurcia_headshot.jpg";
import sheck from "../assets/team_headshots/sheck_headshot.jpg";
import dkim from "../assets/team_headshots/dkim_headshot.jpg";
import ytalab from "../assets/team_headshots/ytalab_headshot.jpg";
import TechStackBar from "../components/ui/TechStackBar";

const About: React.FC = () => {
    return (
        <div className="">
            <NavBar />

            <div className="mt-20 flex flex-col items-center">
                <header>
                    <p className="text-center mb-5 text-indigo-900 text-opacity-70 text-4xl font-montserrat text-dark-mode">
                        Meet the Team
                    </p>
                </header>

                <div className="home-team-section">
                    <div className="home-team-title"></div>
                    <div className="home-team-card-section">
                        <div className="home-team-card">
                            <img
                                className="mt-5 rounded-full w-24"
                                src={kbulau}
                            ></img>
                            <h3 className="text-indigo-900 text-opacity-70   mt-4 text-[18px] font-montserrat text-dark-mode">
                                Kurt Bulau
                            </h3>
                            <div className="flex flex-row mt-2">
                            <a href="https://www.linkedin.com/in/kurt-bulau/" target='_blank'>
                                    <LinkedInLogoIcon
                                         width={22}
                                         height={22}
                                        className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"
                                    ></LinkedInLogoIcon>
                                </a>
                                <a href="https://github.com/kbulau" target='_blank'>
                                    <GitHubLogoIcon
                                       width={22}
                                       height={22}
                                        className="text-indigo-900 text-opacity-70 text-dark-mode-2"
                                    ></GitHubLogoIcon>
                                </a>
                            </div>
                        </div>
                        <div className="home-team-card">
                            <img
                                className="mt-5 rounded-full w-24"
                                src={sheck}
                            ></img>
                            <h3 className="text-indigo-900 text-opacity-70  mt-4 text-[18px] font-montserrat text-dark-mode">
                                Sam Heck
                            </h3>
                            <div className="flex flex-row mt-2">
                            <a href="https://www.linkedin.com/in/samuelheck/" target='_blank'>
                                    <LinkedInLogoIcon
                                        width={22}
                                        height={22}
                                        className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"
                                    ></LinkedInLogoIcon>
                                </a>
                                <a href="https://github.com/Sam-Heck" target='_blank'>
                                    <GitHubLogoIcon
                                       width={22}
                                       height={22}
                                        className="text-indigo-900 text-opacity-70 text-dark-mode-2"
                                    ></GitHubLogoIcon>
                                </a>
                            </div>
                        </div>
                        <div className="home-team-card">
                            <img
                                className="mt-5 rounded-full w-24"
                                src={dkim}
                            ></img>
                            <h3 className="text-indigo-900 text-opacity-70   mt-4 text-[18px] font-montserrat text-dark-mode">
                                Daniel Kim
                            </h3>
                            <div className="flex flex-row mt-2">
                            <a href="https://www.linkedin.com/in/daniel-y-kim" target='_blank'>
                                    <LinkedInLogoIcon
                                        width={22}
                                        height={22}
                                        className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"
                                    ></LinkedInLogoIcon>
                                </a>
                                <a href="https://github.com/danykdev" target='_blank'>
                                    <GitHubLogoIcon
                                       width={22}
                                       height={22}
                                        className="text-indigo-900 text-opacity-70 text-dark-mode-2"
                                    ></GitHubLogoIcon>
                                </a>
                            </div>
                        </div>
                        <div className="home-team-card">
                            <img
                                className="mt-5 rounded-full w-24"
                                src={dmurcia}
                            ></img>
                            <h3 className="text-indigo-900 text-opacity-70   mt-4 text-[18px] font-montserrat text-dark-mode">
                                Danny Murcia
                            </h3>
                            <div className="flex flex-row mt-2">
                                <a href="https://www.linkedin.com/in/danny-murcia/" target='_blank'>
                                    <LinkedInLogoIcon
                                         width={22}
                                         height={22}
                                        className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"
                                    ></LinkedInLogoIcon>
                                </a>
                                <a href="https://github.com/dm2800" target='_blank'>
                                    <GitHubLogoIcon
                                         width={22}
                                         height={22}
                                        className="text-indigo-900 text-opacity-70 text-dark-mode-2"
                                    ></GitHubLogoIcon>
                                </a>
                            </div>
                        </div>
                        <div className="home-team-card">
                            <img
                                className="mt-5 rounded-full w-24"
                                src={ytalab}
                            ></img>
                            <h3 className="text-indigo-900 text-opacity-70  mt-4 text-[18px] font-montserrat text-dark-mode">
                                Yahya Talab
                            </h3>
                            <div className="flex flex-row mt-2">
                                <a href="http://www.linkedin.com/in/yahya-talab-5329a9176" target='_blank'>
                                    <LinkedInLogoIcon
                                        width={22}
                                        height={22}
                                        className="text-indigo-900 text-opacity-70 mr-3 text-dark-mode-2"
                                    ></LinkedInLogoIcon>
                                </a>
                                <a href="https://github.com/YahyaT95" target='_blank'>
                                    <GitHubLogoIcon
                                        width={22}
                                        height={22}
                                        className="text-indigo-900 text-opacity-70 text-dark-mode-2"
                                    ></GitHubLogoIcon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <header>
                    <p className="text-center mb-5 text-indigo-900 text-opacity-70 text-3xl font-montserrat text-dark-mode">
                        Our Technologies
                    </p>
                </header>
                <TechStackBar />

               
            </div>
            <Footer />
        </div>
    );
};

export default About;
