import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { fetchNotifications } from '../../store/notifications';
import OpenModalButton from "../OpenModalButton";
import NotificationsModal from '../NotificationsModal';
import { fetchLocations } from '../../store/locations';

function Navigation({ isLoaded, setRefresh }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const notifications = useSelector(state => state.notifications.notifications)
	const locations = useSelector(state => state.locations.locations)
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
	const refresh = useSelector((state) => state.friends.refresh);

	useEffect(() => {
		dispatch(fetchNotifications());
		dispatch(fetchLocations())
	}, [dispatch, sessionUser]);


	const getUnreadNotifications = () => {
		if (!notifications) {
			return 0;
		}
		const unreadNotifications = Object.values(notifications).filter(notification => !notification.read)
		return unreadNotifications.length
	}

	useEffect(() => {
		const count = getUnreadNotifications();
		setUnreadNotificationsCount(count);
	}, [notifications, sessionUser])

	if (!notifications) {
		return null
	}

	return (
		<nav className='site-nav'>
			<ul className='nav-list'>
				<li >
					<NavLink className="nav-home-button" exact to="/"><i class="fa-solid fa-mountain"></i> Lets Hang!</NavLink>
				</li>
				{/* <li className="nav-search">
					<input
						readOnly className="nav-search-bar" type="search" placeholder='Feature not yet implimented' />
				</li> */}
				<li className="nav-bar-rightside-container">
					<OpenModalButton
						buttonText={
							<div className="nav-bar-bell-and-num">
								<i class={sessionUser ? "fa-solid fa-bell" : "hidden"}></i>
								<span className={sessionUser ? "navigationBellNumber" : "hidden"}>{unreadNotificationsCount}</span>
							</div>
						} modalComponent={
							<NotificationsModal notifications={notifications} locations={locations}
								onRefresh={refresh}
							/>
						}
						disabled={unreadNotificationsCount === 0}
					/>
					{isLoaded && (
						<ProfileButton user={sessionUser} />
					)}
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
