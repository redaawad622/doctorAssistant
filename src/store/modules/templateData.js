export default {
	namespaced: true,
	state: {
		items: [],
		meta: { total: 0 },
		links: null,
		loading: false
	},
	getters: {
		items: state => {
			return state.items;
		},
		meta: state => {
			return state.meta;
		},
		loading: state => {
			return state.loading;
		}
	},
	mutations: {
		updateItems(state, payload) {
			state.items = payload;
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
		deleteItem(state, payload) {
			state.items.splice(payload, 1);
		},
		updateOrAdd(state, payload) {
			const items = state.items;
			const index = items.findIndex(elm => {
				return elm.id === payload.id;
			});
			if (index === -1) {
				items.unshift(payload);
			} else {
				items[index] = payload;
			}
			state.items = [...items];
		},
		reset(state) {
			state.items = [];
			state.links = null;
			state.loading = false;
			state.meta = { total: 0 };
		}
	},
	actions: {
		createOrUpdate({ commit }, payload) {
			return new Promise((resolve, reject) => {
				window.axios
					.post(payload.link, payload.data)
					.then(res => {
						commit('updateOrAdd', res.data.result);
						resolve(res);
					})
					.catch(rej => {
						reject(rej);
					});
			});
		},

		getItems({ commit }, payload) {
			commit('updateLoading', true);
			return new Promise(() => {
				window
					.axios(payload.link, { params: payload.data })
					.then(res => {
						commit('updateLoading', false);
						commit('updateItems', res.data.data);
						commit('updateMeta', res.data.meta);
						commit('updateLinks', res.data.links);
					})
					.catch(() => {
						commit('updateLoading', false);
					});
			});
		},
		deleteItem(context, payload) {
			return new Promise((resolve, reject) => {
				window.axios
					.delete(payload.link)
					.then(res => {
						resolve(res);
					})
					.catch(() => {
						reject();
					});
			});
		}
	}
};
