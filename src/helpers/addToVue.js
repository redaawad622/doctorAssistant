import { getItem } from './storage';

export const addToVueProto = function(Vue) {
	const appUrl = getItem('url');
	const storagePath = appUrl + 'storage';
	Vue.prototype.$appUrl = appUrl;
	Vue.prototype.$storagePath = storagePath;
	Vue.prototype.$userPath = storagePath + '/users';
	Vue.prototype.$sessionPath = storagePath + '/session/';
	Vue.prototype.$imgPath = '/img/';
	Vue.prototype.$iconPath = '/img/icon/';

	Vue.prototype.$getRgba = function(color, opacity = '0.9') {
		let result = this.$vuetify.theme.themes.light.primary;
		if (color && color.indexOf('a') == -1) {
			result = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
		}
		return result;
	};
};
