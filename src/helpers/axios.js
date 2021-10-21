import axios from 'axios';

const baseURL = process.env.REACT_APP_BASEURL_API;
let headers = {
	'content-type': 'application/json'
};

const axiosInstance = axios.create({
	baseURL,
	headers
});

export default axiosInstance;
