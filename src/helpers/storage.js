export const setItem = (name, value, remember = true) => {
	if (value && typeof value === 'object') {
		const val = JSON.stringify(value);
		if (remember) {
			localStorage.setItem(name, val);
		} else {
			sessionStorage.setItem(name, val);
		}
	} else {
		if (remember) {
			localStorage.setItem(name, value);
		} else {
			sessionStorage.setItem(name, value);
		}
	}
};

export const getItem = name => {
	const val = localStorage.getItem(name) || sessionStorage.getItem(name);
	if (val) {
		try {
			return JSON.parse(val);
		} catch (err) {
			return val;
		}
	} else {
		return val;
	}
};
export const removeItem = name => {
	localStorage.removeItem(name);
	sessionStorage.removeItem(name);
};
