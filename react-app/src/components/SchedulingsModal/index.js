import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchSchedulings } from "../../store/schedulings";


const Schedulings = () => {
  const dispatch = useDispatch();
  const schedulings = useSelector(state => state.schedulings)

  useEffect(() => {
    dispatch(fetchSchedulings())
  }, [dispatch])

  return (
    <div></div>
  )
}

export default Schedulings
