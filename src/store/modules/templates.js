import api from './api';
import { getItem, setItem } from '../../helpers/storage';
export default {
	namespaced: true,
	state: {
		complaint: getItem('DA_complaint') || [],
		history: getItem('DA_history') || [],
		examination: getItem('DA_examination') || [],
		medicine: getItem('DA_medicine') || [],
		doses: getItem('DA_doses') || [],
		diagnosis: getItem('DA_diagnosis') || [],
		request: getItem('DA_request') || [],
		notes: getItem('DA_notes') || []
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
		},
		medicine: state => {
			return state.medicine;
		},
		doses: state => {
			return state.doses;
		},
		diagnosis: state => {
			return state.diagnosis;
		},
		request: state => {
			return state.request;
		},
		notes: state => {
			return state.notes;
		}
	},
	mutations: {
		updateComplaint(state, payload) {
			state.complaint = payload;
			setItem('DA_complaint', state.complaint);
		},
		updateHistory(state, payload) {
			state.history = payload;
			setItem('DA_history', state.history);
		},
		updateExamination(state, payload) {
			state.examination = payload;
			setItem('DA_examination', state.examination);
		},
		updateMedicine(state, payload) {
			state.medicine = payload;
			setItem('DA_medicine', state.medicine);
		},
		updateDoses(state, payload) {
			state.doses = payload;
			setItem('DA_doses', state.doses);
		},
		updateDiagnosis(state, payload) {
			state.diagnosis = payload;
			setItem('DA_diagnosis', state.diagnosis);
		},
		updateRequest(state, payload) {
			state.request = payload;
			setItem('DA_request', state.request);
		},
		updateNotes(state, payload) {
			state.notes = payload;
			setItem('DA_notes', state.notes);
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
		},
		getMedicine({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getMedicine).then(res => {
					resolve();
					commit('updateMedicine', res.data.result);
				});
			});
		},
		getDoses({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getDoses).then(res => {
					resolve();
					commit('updateDoses', res.data.result);
				});
			});
		},
		getDiagnosis({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getDiagnosis).then(res => {
					resolve();
					commit('updateDiagnosis', res.data.result);
				});
			});
		},
		getRequest({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getRequest).then(res => {
					resolve();
					commit('updateRequest', res.data.result);
				});
			});
		},
		getNotes({ commit }) {
			return new Promise(resolve => {
				window.axios(api.getNotes).then(res => {
					resolve();
					commit('updateNotes', res.data.result);
				});
			});
		}
	}
};
