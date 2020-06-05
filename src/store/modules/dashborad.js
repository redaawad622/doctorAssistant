import api from './api';

export default {
	namespaced: true,
	state: {
		data: null,
		todaySession: []
	},
	getters: {
		data: state => {
			return state.data;
		},
		todaySession: state => {
			return state.todaySession;
		}
	},
	mutations: {
		updateData(state, payload) {
			state.data = payload;
		},
		updateTodaySession(state, payload) {
			state.todaySession = payload;
		}
	},
	actions: {
		getData({ commit }) {
			return new Promise((resolve, reject) => {
				window
					.axios(api.getData)
					.then(res => {
						commit('updateData', res.data);
						resolve();
					})
					.catch(() => {
						reject();
					});
			});
		},
		getTodaySession({ commit }) {
			return new Promise((resolve, reject) => {
				window
					.axios(api.todaySession)
					.then(res => {
						commit('updateTodaySession', res.data.lastSessions);
						resolve();
					})
					.catch(() => {
						reject();
					});
			});
		}
	}
};
