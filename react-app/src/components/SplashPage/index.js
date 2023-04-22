import "./SplashPage.css"
import React from "react"
import OpenModalButton from "../OpenModalButton"
import SignupFormModal from "../SignupFormModal"
import LoginFormModal from "../LoginFormModal"

function SplashPage() {
  return (
    <div className="splash-page-container app">
      <div className="splash-page-left-container">
        <h1>
          Find Your Perfect Climbing Buddy with Let's Hang!
        </h1>
        <div className="sign-up-login-button">Already Signed up? Click<OpenModalButton buttonText=' Here!' modalComponent={<LoginFormModal />} /></div>
        <div className="sign-up-login-button">
          Ready to start sending with your new partner? Sign up by clicking
          <OpenModalButton buttonText="Here!" modalComponent={< SignupFormModal />} />
        </div>

        {/* <h3>
          Welcome to Let's Hang, the ultimate app that connects you with like-minded climbing enthusiasts, ready to embark on exciting vertical adventures together. Discover potential climbing partners based on skill level, location, and shared interests. With Let's Hang, scaling new heights becomes even more enjoyable and safe, surrounded by a supportive community of fellow climbers. Start using Let's Hang today and never climb alone again!"
        </h3> */}
      </div>
      <div className="splash-page-right-container">right</div>
    </div>
  )
}

export default SplashPage
