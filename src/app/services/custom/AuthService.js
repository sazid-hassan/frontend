import FuseUtils from '@fuse/utils/FuseUtils';
import axios from '../../../helpers/axios';
// import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';

class AuthService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	setSessionUser = user => {
		if (user) {
			localStorage.setItem('user', user);
			const token = localStorage.getItem('jwt_access_token');
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			localStorage.removeItem('user');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
						this.setSessionUser(null);
						localStorage.removeItem('device');
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		} else if (access_token) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.setSessionUser(null);
			localStorage.removeItem('device');
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		const device = uuidv4();
		// const data = {
		// 	email: email,
		// 	password: password,
		// 	device: device
		// };
		// console.log(data);
		localStorage.setItem('device', device);
		return new Promise((resolve, reject) => {
			axios
				.post('/login', {
					email,
					password,
					device
				})
				.then(response => {
					if (response.status === 200) {
						this.setSession(response.data.token);
						console.log(response.data);
						// this.setSessionUser(JSON.stringify(response));
						this.setSessionUser(JSON.stringify(response.data));
						resolve(response.data);
					} else {
						console.log('response error ' + JSON.parse(response));
						reject(response.errors);
					}
				})
				.catch(error => {
					if (error.response && error.response.status === 422) {
						reject(error.response);
					} else {
						console.error(error);
					}
					// console.log('error from signin : ' + JSON.parse(error.response) + ' ' + error.response.status);
				});
		});
	};

	// signInWithToken = () => {
	// 	return new Promise((resolve, reject) => {
	// 		axios
	// 			.get('/api/auth/access-token', {
	// 				data: {
	// 					access_token: this.getAccessToken()
	// 				}
	// 			})
	// 			.then(response => {
	// 				if (response.data.user) {
	// 					this.setSession(response.data.access_token);
	// 					resolve(response.data.user);
	// 				} else {
	// 					this.logout();
	// 					reject(new Error('Failed to login with token.'));
	// 				}
	// 			})
	// 			.catch(error => {
	// 				this.logout();
	// 				reject(new Error('Failed to login with token.'));
	// 			});
	// 	});
	// };

	// updateUserData = user => {
	// 	return axios.post('/api/auth/user/update', {
	// 		user
	// 	});
	// };

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	getAuthUser = () => {
		return JSON.parse(window.localStorage.getItem('user'));
	};

	logout = async user => {
		const info = {
			user_id: user.id,
			device: localStorage.getItem('device')
		};

		//call api to logout
		try {
			const response = await axios.post('/logout', JSON.stringify(info));

			if (response.status === 204) {
				//Remove from local storage
				this.setSession(null);
				this.setSessionUser(null);
				localStorage.removeItem('device');
			}
		} catch (error) {
			return error;
		}
	};

	// logout = () => {
	// 	this.setSession(null);
	// 	this.setSessionUser(null);
	// };

	// isAuthTokenValid = access_token => {
	// 	if (!access_token) {
	// 		return false;
	// 	}
	// 	const decoded = jwtDecode(access_token);
	// 	const currentTime = Date.now() / 1000;
	// 	if (decoded.exp < currentTime) {
	// 		console.warn('access token expired');
	// 		return false;
	// 	}

	// 	return true;
	// };
}

const instance = new AuthService();

export default instance;
