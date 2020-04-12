import api from './api';

export default {
	namespaced: true,
	state: {
		complaint: [],
		history: [],
		examination: []
	},
	getters: {
		complaint: state => {
			return state.complaint;
		},
		history: state => {
			return state.history;
		},
		examination: state => {
			return state.examination;
		}
	},
	mutations: {
		updateComplaint(state, payload) {
			state.complaint = payload;
		},
		updateHistory(state, payload) {
			state.history = payload;
		},
		updateExamination(state, payload) {
			state.examination = payload;
		}
	},
	actions: {
		getComplaint({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getComplaint).then(res => {
					resolve();
					commit('updateComplaint', res.data.result);
				});
			});
		},
		getHistory({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getHistory).then(res => {
					resolve();
					commit('updateHistory', res.data.result);
				});
			});
		},
		getExamination({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getExamination).then(res => {
					resolve();
					commit('updateExamination', res.data.result);
				});
			});
		}
	}
};
