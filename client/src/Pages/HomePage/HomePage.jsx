import HomePageTitle from "../../Components/HomePageTitle/HomePageTitle";
import HomePageCompanies from "../../Components/HomePageCompanies/HomePageCompanies";
import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
    return (
        <div className="homepage">
            <div className="introduction">
                <div className="introduction__decoration">
                    <img src="/Img/decoration-homepage.svg" alt=""></img>
                    <img src="/Img/decoration-homepage.svg" alt=""></img>
                </div>
                <div className="introduction__start">
                    <svg width="48" height="48" fill="hsl(27,90%,50%)">
                        <path d="M18.5 5a1 1 0 1 0 0 2c.63 0 1.24.05 1.84.15a1 1 0 0 0 .32-1.98A13.6 13.6 0 0 0 18.5 5Zm7.02 1.97a1 1 0 1 0-1.04 1.7 11.5 11.5 0 0 1 5.44 8.45 1 1 0 0 0 1.98-.24 13.5 13.5 0 0 0-6.38-9.91ZM18.5 0a18.5 18.5 0 1 0 10.76 33.55c.16.57.46 1.12.9 1.57L40 44.94A3.5 3.5 0 1 0 44.94 40l-9.82-9.82c-.45-.45-1-.75-1.57-.9A18.5 18.5 0 0 0 18.5 0ZM2 18.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0Zm29.58 15.2a1.5 1.5 0 1 1 2.12-2.12l9.83 9.83a1.5 1.5 0 1 1-2.12 2.12l-9.83-9.83Z" />
                    </svg>
                    <h2>
                        Find the best answer to your technical question, help others answer theirs
                    </h2>
                    <a href="/users/signup">Join the community</a>
                    <p>
                        or <Link to="/questions">search content</Link>
                    </p>
                </div>
                <HomePageTitle />
                <div className="introduction__statistical">
                    <div>
                        <div className="number">100+ million</div>
                        <div className="content">
                            monthly visitors to Stack Overflow & Stack Exchange
                        </div>
                    </div>
                    <div>
                        <div className="number">45.1+ billion</div>
                        <div className="content">Times a developer got help since 2008</div>
                    </div>
                    <div>
                        <div className="number">179% ROI</div>
                        <div className="content">from companies using Stack Overflow for Teams</div>
                    </div>
                    <div>
                        <div className="number">5,000+</div>
                        <div className="content">
                            Stack Overflow for Teams instances active every day
                        </div>
                    </div>
                </div>
            </div>
            <div className="introduction__column">
                <div className="column__logo"></div>
                <img src="/Img/illo-public.svg" alt=""></img>
                <div className="column__title">
                    A public platform building the definitive collection of coding questions &
                    answers
                </div>
                <div className="column__content">
                    A community-based space to find and contribute answers to technical challenges,
                    and one of the most popular websites in the world.
                </div>
                <a href="/users/signup">Join the community</a>
                <p>
                    or <Link to="/questions">search content</Link>
                </p>
            </div>
            <HomePageCompanies />
        </div>
    );
}

export default HomePage;
