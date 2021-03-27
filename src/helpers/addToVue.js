import { getItem } from './storage';
import { ipcRenderer } from 'electron';
export const addToVueProto = function(Vue) {
	const appUrl = getItem('url');
	const storagePath = appUrl + '/DA_APP/storage/app/public';
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
	Vue.prototype.$arrayToString = function(value = [], split = ',') {
		if (Array.isArray(value)) {
			value = value ? value.join(split) || '' : '';
		} else {
			value = '';
		}
		return value;
	};
	Vue.prototype.$formateDate = function(value, split = ',') {
		if (Array.isArray(value)) {
			value = value ? value.join(split) || '' : '';
		} else {
			value = '';
		}
		return value;
	};
	Vue.prototype.$reloadPage = function() {
		ipcRenderer.send('refr');
	};
};
