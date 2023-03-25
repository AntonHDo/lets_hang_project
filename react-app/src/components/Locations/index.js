import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchLocations } from "../../store/locations";
import { fetchNotifications } from "../../store/notifications";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations.locations)
  const user = useSelector((state) => state.session.user)

  const userLoggedIn = () => {
    if (user) {
      return user && (
        <div></div>
      )
    } else {
      return (
        <div className="loggedOutHomeBannerContainer">
          <h2>Make the first move!</h2>
          <div>Start meeting new people in your area! If you already have an account, sign in to use Bumble on the web.</div>

          <div>
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
    dispatch(fetchLocations())
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
      <div className="homeLocationsContainer">
        {locationsArr?.map((location) => (
          <NavLink key={location.id} to={`/locations/${location.id}`}>
            <img src={location.preview_img} />
            <div>{location.location_name}</div>
            <div className="numberOfPeopleAndIcon">
              <div>{location?.users?.length}</div>
              <div><i className="fa-solid fa-user-group"></i></div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="homeAboutUsAndMissionContainer">
        <div className="homeAboutUsContainer">
          <div>About Us</div>
          <img alt="nothing yet" />
        </div>
        <div className="homeMissionContainer">
          <div>Mission</div>
          <img alt="nothing yet" />
        </div>
      </div>
    </div>
  )
}

export default Locations
