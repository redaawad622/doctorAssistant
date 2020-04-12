// takes a {} object and returns a FormData object
export function objectToFormData(obj, form, namespace) {
	let fd = form || new FormData();
	let formKey;

	for (let property in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, property)) {
			if (namespace) {
				formKey = namespace + '[' + property + ']';
			} else {
				formKey = property;
			}

			// if the property is an object, but not a File,
			// use recursivity.
			if (
				Array.isArray(obj[property]) &&
				(property === 'medicines' ||
					property === 'requests' ||
					property === 'diagnosis' ||
					property === 'multipart' ||
					property === 'multipart_l' ||
					property === 'multipart_r' ||
					property === 'description')
			) {
				if (property === 'description') {
					fd.append(formKey, obj[property].join(',') || '');
				} else {
					fd.append(formKey, JSON.stringify(obj[property]));
				}
			} else if (
				typeof obj[property] === 'object' &&
				!(obj[property] instanceof File) &&
				!(obj[property] instanceof Blob)
			) {
				if (obj[property] == null) {
					fd.append(formKey, '');
				}
				objectToFormData(obj[property], fd, property);
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property] || '');
			}
		}
	}

	return fd;
}
export function stringToArray(value = '', split = ',') {
	if (typeof value === 'string') {
		value = value ? value.split(split) || [] : [];
	} else {
		value = [];
	}
	return value;
}
