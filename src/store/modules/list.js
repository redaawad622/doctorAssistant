export default {
	namespaced: true,
	state: {
		VA_List: [
			'NO PL',
			'PL',
			'HM',
			'CF 10 cm',
			'CF 30 cm',
			'CF 50 cm',
			'CF 1 m',
			'CF 2 m',
			'CF 3 m',
			'CF 4 m',
			'CF 5 m',
			'6/60',
			'6/36',
			'6/24',
			'6/18',
			'6/12',
			'6/9',
			'6/6',
			'0.05',
			'0.1',
			'0.2',
			'0.3',
			'0.4',
			'0.5',
			'0.6',
			'0.7',
			'0.8',
			'0.9',
			'1.0'
		]
	},
	getters: {
		VA_List: state => {
			return state.VA_List;
		}
	}
};
