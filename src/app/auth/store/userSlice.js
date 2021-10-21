import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import AuthService from 'app/services/custom';

export const setUserDataAuth0 = tokenData => async dispatch => {
	const user = {
		role: ['admin'],
		from: 'auth0',
		data: {
			displayName: tokenData.username || tokenData.name,
			photoURL: tokenData.picture,
			email: tokenData.email,
			settings:
				tokenData.user_metadata && tokenData.user_metadata.settings ? tokenData.user_metadata.settings : {},
			shortcuts:
				tokenData.user_metadata && tokenData.user_metadata.shortcuts ? tokenData.user_metadata.shortcuts : []
		}
	};

	return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async dispatch => {
	if (
		user &&
		user.data &&
		user.data.settings &&
		user.data.settings.theme &&
		user.data.settings.layout &&
		user.data.settings.layout.style
	) {
		// Set user data but do not update
		return dispatch(setUserData(user));
	}

	// Create missing user settings
	return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = authUser => async (dispatch, getState) => {
	const guestUser = getState().auth.user;
	const fuseDefaultSettings = getState().fuse.settings.defaults;
	const { currentUser } = firebase.auth();

	/**
	 * Merge with current Settings
	 */
	const user = _.merge({}, guestUser, {
		uid: authUser.uid,
		from: 'firebase',
		role: ['admin'],
		data: {
			displayName: authUser.displayName,
			email: authUser.email,
			settings: { ...fuseDefaultSettings }
		}
	});
	currentUser.updateProfile(user.data);

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const setUserData = user => async (dispatch, getState) => {
	// console.log(user);
	/*
        You can redirect the logged-in user to a specific route depending on his role
         */

	/*
    Set User Settings
     */
	// dispatch(setDefaultSettings(user.data.settings));
	const permissions = user.permissions.map(permission => permission.name);

	const fuseDefaultSettings = getState().fuse.settings.defaults;

	const mapppedUser = {
		id: user.data.id,
		// from: 'Laravel.Api',
		role: permissions,
		roles: user.data.roleNames,
		redirectUrl: '/',
		data: {
			id: user.data.id,
			// redirectUrl: '/test',
			name: user.data.name,
			displayName: user.data.name,
			email: user.data.email,
			photoURL: user.data.photo ? user.data.photo.img_url : 'assets/images/avatars/profile.jpg',
			settings: { ...fuseDefaultSettings }
		},
		rawData: user
	};

	history.location.state = {
		redirectUrl: user.redirectUrl // for example 'apps/academy'
	};

	dispatch(setUser(mapppedUser));

	// history.push({
	// 	pathname: '/'
	// });
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		data: {
			...user.data,
			shortcuts
		}
	};

	dispatch(updateUserData(user));

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/login'
	});

	switch (user.from) {
		case 'firebase': {
			firebaseService.signOut();
			break;
		}
		case 'auth0': {
			auth0Service.logout();
			break;
		}
		default: {
			// jwtService.logout();
			// AuthService.logout();
			AuthService.logout(user);
		}
	}

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

export const updateUserData = user => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}
	switch (user.from) {
		case 'firebase': {
			firebaseService
				.updateUserData(user)
				.then(() => {
					dispatch(showMessage({ message: 'User data saved to firebase' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
		case 'auth0': {
			auth0Service
				.updateUserData({
					settings: user.data.settings,
					shortcuts: user.data.shortcuts
				})
				.then(() => {
					dispatch(showMessage({ message: 'User data saved to auth0' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
		// default: {
		// 	jwtService
		// 		.updateUserData(user)
		// 		.then(() => {
		// 			dispatch(showMessage({ message: 'User data saved with api' }));
		// 		})
		// 		.catch(error => {
		// 			dispatch(showMessage({ message: error.message }));
		// 		});
		// 	break;
		// }
		default: {
			AuthService.updateUserData(user)
				.then(() => {
					dispatch(showMessage({ message: 'User data saved with api' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
	}
};

const initialState = {
	role: [], // guest
	roles: [],
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;