import "./SplashPage.css"
import React from "react"
import OpenModalButton from "../OpenModalButton"
import SignupFormModal from "../SignupFormModal"
import LoginFormModal from "../LoginFormModal"
import SplashPageImage from "../Banner/splashpageimage.jpg"

function SplashPage() {
  return (
    <>
      <div className="splash-page-container app">
        <div className="splash-page-left-container">
          <h1>
            Find Your Perfect Climbing Buddy with Let's Hang!
          </h1>
          <div className="sign-up-background-container">
            <div className="sign-up-login-button">Already Signed up? Click<OpenModalButton buttonText=' Here!' modalComponent={<LoginFormModal />} /></div>
            <div className="sign-up-login-button">
              Ready to start sending with your new partner? Sign up by clicking
              <OpenModalButton buttonText="Here!" modalComponent={< SignupFormModal />} />
            </div>
            <div className="sign-up-login-button">
              Or scroll down to read more about us! <i className="fa-solid fa-arrow-down"></i>
            </div>
          </div>


        </div>
        <div className="splash-page-right-container">
          <img src={SplashPageImage} alt="splashPage" />
        </div>

      </div >
      <div className="aboutUs-SplashPageContainer">

        <div className="boxes-container">
          <div className="splash-boxes">
            <div className="splash-box-title">About Us!</div>
            <div className="splash-box-description">
              Welcome to Let's Hang, the ultimate platform for rock climbing enthusiasts
              who are searching for the perfect climbing partner. Our journey began
              when we realized the importance of having a reliable and like-minded
              companion to share our love for rock climbing. We understand the
              challenges of finding someone who shares your passion, skill level, and
              commitment, which is why we created this app. Let's Hang is designed to
              connect climbers of all levels, helping you find the right partner to
              embark on new adventures and reach greater heights together.
            </div>
          </div>
          <div className="splash-boxes">
            <div className="splash-box-title">Our Mission!</div>
            <div className="splash-box-description">
              At Let's Hang, our mission is to help you find your potential life-long
              climbing partner. We believe that having the right climbing companion can
              make all the difference in reaching your goals, pushing your limits, and
              creating unforgettable experiences. Our platform aims to foster a community
              of climbers who support, encourage, and inspire one another to reach new
              heights. By connecting climbers through our app, we hope to nurture lasting
              friendships and cultivate a strong sense of camaraderie within the rock
              climbing community. Join us on this exciting journey as we help climbers
              like you create lasting connections and unforgettable memories. Together,
              we can conquer the most challenging cliffs and discover the true essence of
              rock climbing: trust, teamwork, and a shared passion for adventure.
            </div>
          </div>
          <div className="splash-boxes">
            <div className="splash-box-title">
              Common Terminologies
            </div>
            <div className="splash-box-description">
              <ul>
                <li>
                  Send: To successfully complete a climb without falling or resting on the rope or gear.
                </li>
                <br />
                <li>
                  Flash: To climb a route on the first attempt without falling and without prior knowledge or beta.
                </li>
                <br />
                <li>
                  Belay: The technique of controlling the rope to protect a climber from a fall.
                </li>
                <br />
                <li>
                  Beta: Information about a climb, including the best way to climb it.
                </li>
                <br />
                <li>
                  Boulder: A small rock or climbing wall without the use of ropes or harnesses.
                </li>
                <br />
                <li>
                  Chalk: Magnesium carbonate used to dry out and improve grip on hands.
                </li>
                <br />
                <li>
                  Dyno: A dynamic move where a climber jumps from one hold to another.
                </li>
                <br />
                <li>
                  Jug: A large hold that can be gripped easily with the entire hand.
                </li>
                <br />
                <li>
                  Pitch: A section of a climb that is separated from other sections by a belay station or ledge.
                </li>
                <br />
                <li>
                  Top-out: To finish a boulder problem by climbing over the top of the boulder.
                </li>
                <br />
                <li>
                  Whipper: A fall that is further than expected, often resulting in the climber being caught by the rope or gear.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </>

  )
}

export default SplashPage
