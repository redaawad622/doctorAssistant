import {
	AUTH_NAMESPACE,
	PATIENTS_NAMESPACE,
	PATIENT_NAMESPACE,
	TEMPLATES_NAMESPACE,
	SESSION_NAMESPACE,
	LIST_NAMESPACE
} from './namespaces';
import auth from './auth';
import patients from './patients';
import patient from './patient';
import templates from './templates';
import session from './session';
import list from './list';

const modules = {};
modules[AUTH_NAMESPACE] = auth;
modules[PATIENTS_NAMESPACE] = patients;
modules[PATIENT_NAMESPACE] = patient;
modules[TEMPLATES_NAMESPACE] = templates;
modules[SESSION_NAMESPACE] = session;
modules[LIST_NAMESPACE] = list;

export default modules;
