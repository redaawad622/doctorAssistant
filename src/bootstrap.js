import { getItem, setItem } from './helpers/storage';
let url = getItem('url');
if (!url) {
	url = 'http://localhost:8000/';
	setItem('url', url, true);
}
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = url + 'api/';

const user = getItem('DAUD');
if (user && user.token) {
	window.axios.defaults.headers.common[
		'Authorization'
	] = `Bearer ${user.token}`;
}
