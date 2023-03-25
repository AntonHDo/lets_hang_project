import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { fetchNotifications } from '../../store/notifications';
import OpenModalButton from "../OpenModalButton";
import NotificationsModal from '../NotificationsModal';
import { fetchLocations } from '../../store/locations';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const notifications = useSelector(state => state.notifications.notifications)
	const locations = useSelector(state => state.locations.locations)
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

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


	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<OpenModalButton
					buttonText={
						<>
							<i class={sessionUser ? "fa-solid fa-bell" : "hidden"}></i>
							<span className={sessionUser ? "navigationBellNumber" : "hidden"}>{unreadNotificationsCount}</span>
						</>
					} modalComponent={
						<NotificationsModal notifications={notifications} locations={locations} />
					}
					disabled={unreadNotificationsCount === 0}
				/>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
