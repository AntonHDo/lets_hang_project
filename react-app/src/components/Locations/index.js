import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchLocations } from "../../store/locations";
import { fetchNotifications } from "../../store/notifications";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Locations.css"

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations.locations)
  const user = useSelector((state) => state.session.user)

  const userLoggedIn = () => {
    if (user) {
      return user && (
        <div className="loggedOutHomeBannerContainer">
          <h2>Welcome to Lets Hang!</h2>
          <h2>Start sending with new people! Select a location below!</h2>
        </div>
      )
    } else {
      return (
        <div className="loggedOutHomeBannerContainer">
          <h2>Make the first move!</h2>
          <div className="loggedOutHomeBannerText">Start meeting new people in your area! If you already have an account, sign in on the web!</div>

          <div className="loggedOutButtons non-modal">
            <OpenModalButton
              buttonText="Log In"
              // onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      )
    }
  }

  // console.log("locations from home page", locations)
  useEffect(() => {
    // dispatch(fetchLocations())
    dispatch(fetchNotifications())
  }, [dispatch])

  if (!locations) {
    return <div>Loading...</div>
  }

  const locationsArr = Object.values(locations)
  // console.log("from home page", locationsArr)

  return locations && locationsArr && (
    <div className="homePageContainer">
      {userLoggedIn()}

      <div className="homeLocationsContainer white-space">
        {/* {user ? <div className="loggedInTextTitle">Start sending with new people! Select a location below!</div> : <></>} */}
        {locationsArr?.map((location) => (
          <NavLink
            onClick={!user ? () => window.alert("Must sign up to start sending with someone!") : () => <></>}
            className="navLinkHomePage" key={location.id} to={`/locations/${location.id}`}>
            <img src={location.preview_img} />
            <div className="homePageLocationAndPeople">
              <div>{location.location_name}</div>
              <div className="numberOfPeopleAndIcon">
                <div>{location?.users?.length}</div>
                <div><i className="fa-solid fa-user-group"></i></div>
              </div>
            </div>
          </NavLink>

        ))}
      </div>
      <section class="splash-page-content ">
        <div class="about-us white-space">
          <div class="text-container block">
            <h2>About Us</h2>
            <p>
              Welcome to Let's Hang, the ultimate platform for rock climbing enthusiasts who are searching for the perfect climbing partner. Our journey began when we realized the importance of having a reliable and like-minded companion to share our love for rock climbing. We understand the challenges of finding someone who shares your passion, skill level, and commitment, which is why we created this app. Let's Hang is designed to connect climbers of all levels, helping you find the right partner to embark on new adventures and reach greater heights together.
            </p>
          </div>
          <div class="image-container">
            <img src="https://i.imgur.com/HHbB7jL.png" alt="" />
          </div>
        </div>
        <div class="our-mission white-space">
          <div class="text-container block">
            <h2>Our Mission</h2>
            <p>
              At Let's Hang, our mission is to help you find your potential life-long climbing partner. We believe that having the right climbing companion can make all the difference in reaching your goals, pushing your limits, and creating unforgettable experiences. Our platform aims to foster a community of climbers who support, encourage, and inspire one another to reach new heights. By connecting climbers through our app, we hope to nurture lasting friendships and cultivate a strong sense of camaraderie within the rock climbing community.

              Join us on this exciting journey as we help climbers like you create lasting connections and unforgettable memories. Together, we can conquer the most challenging cliffs and discover the true essence of rock climbing: trust, teamwork, and a shared passion for adventure.
            </p>
          </div>
          <div class="image-container">
            <img
              src="https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="" />
          </div>
        </div>

      </section>
    </div>

  )
}

export default Locations
