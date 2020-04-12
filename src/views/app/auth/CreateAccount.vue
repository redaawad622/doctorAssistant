<template>
	<div class="my-auto">
		<v-list-item class="px-0">
			<v-list-item-content>
				<v-list-item-title class="title font-weight-bold black--text"
					>Create Account</v-list-item-title
				>
				<v-list-item-subtitle
					>create a new doctor acount</v-list-item-subtitle
				>
			</v-list-item-content>
		</v-list-item>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="name"
				:counter="10"
				:rules="nameRules"
				label="Name"
				required
				rounded
				solo-inverted
				flat
				clearable
				dense
			></v-text-field>

			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				required
				rounded
				solo-inverted
				flat
				clearable
				dense
			></v-text-field>
			<v-text-field
				v-model="password"
				:rules="passwordRules"
				label="password"
				required
				rounded
				solo-inverted
				type="password"
				flat
				clearable
				dense
			></v-text-field>
			<v-switch
				inset
				v-model="agree"
				label="I agree to the Terms and Privacy"
				dense
				class="mt-0"
				flat
			>
				<template v-slot:label>
					<div class="black--text subtitle-2">
						I agree to the Terms and Privacy
					</div>
				</template>
			</v-switch>
			<v-btn
				:disabled="!valid || !agree"
				color="primary"
				class="mb-2 text-capitalize font-weight-bold elevation-5"
				height="40px"
				:loading="loading"
				@click.prevent="validate"
			>
				<v-icon left>mdi-plus</v-icon>
				Create
			</v-btn>
			<v-alert
				type="error"
				dense
				text
				v-for="(item, key) in errors"
				:key="`error${key}`"
			>
				{{ item }}
			</v-alert>
		</v-form>
		<div class="mt-10">
			<span class="black--text">have an account ? </span>
			<router-link class="customLink" to="/auth/login">Sign in</router-link>
		</div>
	</div>
</template>

<script>
	import { AUTH_NAMESPACE } from '../../../store/modules/namespaces';
	export default {
		data: () => ({
			agree: true,
			valid: true,
			loading: false,
			name: '',
			nameRules: [
				v => !!v || 'Name is required',
				v => (v && v.length <= 10) || 'Name must be less than 10 characters'
			],
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'password is required',
				v => v.length > 5 || 'password must be at least 6 characters'
			],
			password: '',
			errors: []
		}),

		methods: {
			validate() {
				this.errors = [];
				if (this.$refs.form.validate()) {
					this.loading = true;
					this.$store
						.dispatch(`${AUTH_NAMESPACE}/register`, {
							name: this.name,
							email: this.email,
							password: this.password
						})
						.then(() => {})
						.catch(rej => {
							this.loading = false;
							this.errors = rej.response.data.errors;
						});
				}
			}
		}
	};
</script>
