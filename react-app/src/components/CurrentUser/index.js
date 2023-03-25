import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchCurrentUserSchedulings } from "../../store/schedulings";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const schedulings = useSelector(state => state.schedulings)

  useEffect(() => {
    dispatch(fetchCurrentUserSchedulings(currentUser?.id))
  }, [dispatch])

  return (
    <div>Sup</div>
  )
}

export default CurrentUser
