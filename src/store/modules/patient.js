import api from './api';
export default {
	namespaced: true,
	state: {
		patient: null,
		sessions: [],
		meta: { total: 0 },
		links: null,
		searchItems: [],
		searchLoading: false
	},
	getters: {
		patient: state => {
			return state.patient;
		},
		sessions: state => {
			return state.sessions;
		},
		meta: state => {
			return state.meta;
		},
		searchItems: state => {
			return state.searchItems;
		},
		searchLoading: state => {
			return state.searchLoading;
		}
	},
	mutations: {
		updatePatient(state, payload) {
			state.patient = payload;
		},
		updateSessions(state, payload) {
			state.sessions = payload;
		},
		updateTotal(state, payload) {
			state.meta.total = payload;
		},
		unshiftSessions(state, payload) {
			state.sessions.unshift(payload);
		},
		updateLinks(state, payload) {
			state.links = payload;
		},
		updateMeta(state, payload) {
			state.meta = payload;
		},
		deleteSession(state, payload) {
			state.sessions.splice(payload, 1);
		},
		updateSearchItems(state, payload) {
			state.searchItems = payload;
		},
		updateSearchLoading(state, payload) {
			state.searchLoading = payload;
		}
	},
	actions: {
		getPatient({ commit }, payload) {
			commit('updatePatient', null);
			commit('updateSessions', []);
			return new Promise((resolve, reject) => {
				window
					.axios(`${api.createPatient}/${payload.id}`)
					.then(res => {
						commit('updatePatient', res.data.patient);
						resolve(res);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		getSessions({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				window
					.axios(`${api.getSessions}/${state.patient.id}`, {
						params: payload
					})
					.then(res => {
						commit('updateSessions', res.data.data);
						commit('updateLinks', res.data.links);
						commit('updateMeta', res.data.meta);
						resolve(res);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		deleteSession(context, payload) {
			return new Promise(resolve => {
				window.axios
					.delete(api.getSession + '/' + payload.id)
					.then(res => {
						resolve(res);
					})
					.catch(() => {});
			});
		},
		searchPatient({ commit }, payload) {
			return new Promise(resolve => {
				commit('updateSearchLoading', true);
				window
					.axios(api.searchPatients, { params: payload })
					.then(res => {
						commit('updateSearchItems', res.data.patients);
						commit('updateSearchLoading', false);
						resolve(res);
					})
					.catch(() => {
						commit('updateSearchLoading', false);
					});
			});
		}
	}
};
