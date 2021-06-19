import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Master from '../views/Master';
import Home from '../views/app/home/Home';
import Statistics from '../views/app/statistics/Statistics';
import Todo from '../views/app/todo/Todo';
import Patients from '../views/app/patient/Patients';
import Patient from '../views/app/patient/Patient';
import Auth from '../views/app/auth/Auth';
import CreateAccount from '../views/app/auth/CreateAccount';
import Login from '../views/app/auth/Login';
import EditProfile from '../views/app/auth/EditProfile';
import Settings from '../views/app/settings/Settings';
import Report from '../views/app/reports/ReportPage';


//templates
import Complaint from '../views/app/templates/Complaint';
import History from '../views/app/templates/History';
import Examination from '../views/app/templates/Examination';
import Medicines from '../views/app/templates/Medicines';
import Requests from '../views/app/templates/Requests';
import Doses from '../views/app/templates/Doses';
import Diagnosis from '../views/app/templates/Diagnosis';
import Notes from '../views/app/templates/Notes';

const routes = [
	{
		path: '/',
		component: Master,
		children: [
			{ path: '', component: Home },
			{
				path: 'auth/',
				component: Auth,
				children: [
					{
						path: 'createAccount',
						component: CreateAccount,
						meta: { hide: true, auth: true },
					},
					{
						path: 'login',
						component: Login,
						meta: { hide: true, auth: true },
					},
				],
			},
			{ path: 'statistics', component: Statistics },
			{ path: 'todo', component: Todo },
			{ path: 'settings', component: Settings },
			{ path: 'editProfile', component: EditProfile },
			{ path: 'patients', component: Patients },
			{ path: 'settings', component: Settings },
			{ path: 'patients/:id', component: Patient },
			{ path: 'report/:id', name:'report', component: Report },


			{ path: 'template/complaint', component: Complaint },
			{ path: 'template/history', component: History },
			{ path: 'template/examination', component: Examination },
			{ path: 'template/medicines', component: Medicines },
			{ path: 'template/doses', component: Doses },
			{ path: 'template/diagnosis', component: Diagnosis },
			{ path: 'template/requests', component: Requests },
			{ path: 'template/notes', component: Notes },
		],
	},
	{ path: '*', component: Master },
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes,
});

export default router;
