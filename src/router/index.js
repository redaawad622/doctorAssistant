import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Master from '../views/Master';
import Patients from '../views/app/patient/Patients';
import Patient from '../views/app/patient/Patient';
import Auth from '../views/app/auth/Auth';
import CreateAccount from '../views/app/auth/CreateAccount';
import Login from '../views/app/auth/Login';
import EditProfile from '../views/app/auth/EditProfile';
const routes = [
	{
		path: '/',
		component: Master,
		children: [
			{
				path: 'auth/',
				component: Auth,
				children: [
					{
						path: 'createAccount',
						component: CreateAccount,
						meta: { hide: true, auth: true }
					},
					{
						path: 'login',
						component: Login,
						meta: { hide: true, auth: true }
					}
				]
			},
			{ path: 'editProfile', component: EditProfile },
			{ path: 'patients', component: Patients },
			{ path: 'patients/:id', component: Patient }
		]
	},
	{ path: '*', component: Master }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
