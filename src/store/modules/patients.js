import api from './api';
export default {
	namespaced: true,
	state: {
		editItem: null,
		dialog: false,
		patients: [],
		meta: { total: 0 },
		links: { next: api.getPatients },
		loading: false
	},
	getters: {
		dialog: state => {
			return state.dialog;
		},
		editItem: state => {
			return state.editItem;
		},
		patients: state => {
			return state.patients;
		},
		meta: state => {
			return state.meta;
		},
		loading: state => {
			return state.loading;
		}
	},
	mutations: {
		updateDialog(state, payload) {
			state.dialog = payload;
		},
		updateEditItem(state, payload) {
			state.editItem = payload;
		},
		updatePatients(state, payload) {
			state.patients = payload;
		},
		updateLinks(state, payload) {
			state.links = payload;
		},
		updateMeta(state, payload) {
			state.meta = payload;
		},
		updateLoading(state, payload) {
			state.loading = payload;
		},
		deletePatient(state, payload) {
			state.patients.splice(payload, 1);
		},
		updateOrAdd(state, payload) {
			const patients = state.patients;
			const index = patients.findIndex(elm => {
				return elm.id === payload.id;
			});
			if (index === -1) {
				patients.unshift(payload);
			} else {
				patients[index] = payload;
			}
			state.patients = [...patients];
		}
	},
	actions: {
		create({ commit }, payload) {
			return new Promise((resolve, reject) => {
				let link = api.createPatient;

				if (payload.id) {
					link = link + '/' + payload.id;
				}
				window.axios
					.post(link, payload)
					.then(res => {
						commit('updateOrAdd', res.data.patient);
						resolve(res.data.patient);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},
		getPatients({ commit }, payload) {
			commit('updateLoading', true);
			return new Promise(() => {
				window
					.axios(api.getPatients, { params: payload })
					.then(res => {
						commit('updateLoading', false);
						commit('updatePatients', res.data.data);
						commit('updateMeta', res.data.meta);
						commit('updateLinks', res.data.links);
					})
					.catch(() => {
						commit('updateLoading', false);
					});
			});
		},
		deletePatient(context, payload) {
			return new Promise(resolve => {
				window.axios
					.delete(api.getPatients + '/' + payload.id)
					.then(res => {
						resolve(res);
					})
					.catch(() => {});
			});
		}
	}
};
