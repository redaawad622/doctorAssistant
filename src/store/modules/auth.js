import { setItem, getItem, removeItem } from '../../helpers/storage';
import api from './api';
export default {
	namespaced: true,
	state: {
		user: getItem('DAUD')
	},
	getters: {
		currentUser: state => {
			return state.user;
		}
	},
	mutations: {
		login(state, payload) {
			const user = Object.assign(
				{},
				payload.data.user,
				{ token: payload.data.token },
				{ info: payload.data.info },
				{ tokenType: payload.data.tokenType }
			);
			setItem('DAUD', user, true);
			state.user = user;
			window.location.reload();
		},
		logout() {
			removeItem('DAUD');
			removeItem('color');
			removeItem('dark');
			removeItem('layout');
			window.location.reload();
		},
		updateUser(state, payload) {
			state.user.info = payload;
			setItem('DAUD', state.user, true);
		}
	},
	actions: {
		login({ commit }, payload) {
			return new Promise((resolve, reject) => {
				window.axios
					.post(api.login, payload)
					.then(response => {
						resolve(response);
						commit('login', response);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		register({ commit }, payload) {
			return new Promise((resolve, reject) => {
				window.axios
					.post(api.register, payload)
					.then(response => {
						resolve(response);
						commit('login', response);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		logout({ commit }) {
			return new Promise((resolve, reject) => {
				commit('logout');

				window.axios
					.get(api.logout)
					.then(response => {
						resolve(response);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		updateUserData({ commit }, payload) {
			return new Promise((resolve, reject) => {
				window.axios
					.post(api.updateUserDate, payload)
					.then(res => {
						resolve(res);
						commit('updateUser', res.data.doctor);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		}
	}
};
