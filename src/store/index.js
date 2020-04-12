import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import { getItem, setItem } from '../helpers/storage';
Vue.use(Vuex);
const defaultInputShape = getItem('inputShape') || {
	filled: true,
	solo: false,
	outlined: false,
	soloInverted: false
};
const defaultSelectType = getItem('selectType') || 'chip';
const defaultFlat = getItem('flat') || { flat: false };
const defaultShaped = getItem('shaped') || { shaped: false };
const defaultRounded = getItem('rounded') || { rounded: true };
export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		inputShape: defaultInputShape,
		selectType: defaultSelectType,
		shaped: defaultShaped,
		flat: defaultFlat,
		rounded: defaultRounded
	},
	getters: {
		inputStyle(state) {
			return {
				...state.inputShape,
				...state.shaped,
				...state.flat,
				...state.rounded
			};
		},
		inputShape(state) {
			return (
				Object.keys(state.inputShape).find(
					elm => state.inputShape[elm] == true
				) || 'line'
			);
		},
		selectType(state) {
			return state.selectType;
		},
		shaped(state) {
			return state.shaped.shaped;
		},
		flat(state) {
			return state.flat.flat;
		},
		rounded(state) {
			return state.rounded.rounded;
		}
	},
	mutations: {
		inputShape(state, payload) {
			let old = { ...state.inputShape };
			Object.keys(old).forEach(elm => {
				if (elm == payload) {
					old[elm] = true;
				} else {
					old[elm] = false;
				}
			});
			state.inputShape = old;
			setItem('inputShape', state.inputShape);
			if (payload == 'line') {
				state.rounded = { rounded: false };
				setItem('rounded', state.rounded);
			}
		},
		selectType(state, payload) {
			state.selectType = payload;
			setItem('selectType', state.selectType);
		},
		shaped(state, payload) {
			state.shaped = { shaped: payload };
			setItem('shaped', state.shaped);
		},
		flat(state, payload) {
			state.flat = { flat: payload };
			setItem('flat', state.flat);
		},
		rounded(state, payload) {
			state.rounded = { rounded: payload };
			setItem('rounded', state.rounded);
		}
	},
	actions: {},
	modules: modules
});
