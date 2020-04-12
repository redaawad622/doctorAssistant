<template>
	<v-card class="w-100" flat>
		<v-card-title class="display-1 font-weight-bold text-capitalize"
			>Doctor profile page
		</v-card-title>
		<v-card-text :class="!$vuetify.breakpoint.xs && 'max-width-400'">
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
					v-model="form.enName"
					:rules="nameRules"
					label="English Name"
					required
					v-bind="inputStyle"
					clearable
					dense
				></v-text-field>
				<v-text-field
					v-model="form.arName"
					:rules="nameRules"
					label="Arabic Name"
					required
					v-bind="inputStyle"
					clearable
					dense
				></v-text-field>
				<v-textarea
					v-model="form.specializationEn"
					:rules="textRules"
					label="specialization English"
					required
					v-bind="inputStyle"
					clearable
					dense
					no-resize
					auto-grow
				></v-textarea>
				<v-textarea
					v-model="form.specializationAr"
					:rules="textRules"
					label="specialization Arabic"
					required
					v-bind="inputStyle"
					clearable
					dense
					no-resize
					auto-grow
				></v-textarea>
				<v-text-field
					v-model="form.hospitalName"
					:rules="nameRules"
					label="Hospital Name"
					required
					v-bind="inputStyle"
					clearable
					dense
				></v-text-field>
				<v-text-field
					v-model="form.personalPhone"
					:rules="phoneRules"
					label="Personal Phone"
					required
					v-bind="inputStyle"
					clearable
					dense
				></v-text-field>
				<v-text-field
					v-model="form.clinicPhone"
					:rules="phoneRules"
					label="Clinic Phone"
					required
					v-bind="inputStyle"
					clearable
					dense
				></v-text-field>
				<v-textarea
					v-model="form.address"
					:rules="textRules"
					label="Address"
					required
					v-bind="inputStyle"
					clearable
					dense
					no-resize
					auto-grow
				></v-textarea>
				<v-btn
					:disabled="!valid"
					color="#A5C13D"
					class="mb-2 text-capitalize font-weight-bold elevation-5"
					height="40px"
					:loading="loading"
					@click.prevent="validate"
					block
				>
					Update
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
		</v-card-text>
		<v-card-actions></v-card-actions>
	</v-card>
</template>

<script>
	import { AUTH_NAMESPACE } from '../../../store/modules/namespaces';
	export default {
		data: () => ({
			valid: true,
			loading: false,
			nameRules: [
				v => !!v || 'field is required',
				v => v.length > 1 || 'field must be at least 2 characters'
			],
			phoneRules: [
				v => !!v || 'field is required',
				v => v.length > 5 || 'field must be at least 6 characters'
			],
			textRules: [
				v => !!v || 'field is required',
				v => v.length > 6 || 'field must be at least 6 characters'
			],

			errors: [],
			form: {
				enName: null,
				arName: null,
				hospitalName: null,
				personalPhone: null,
				clinicPhone: null,
				specializationAr: null,
				specializationEn: null,
				address: null,
				id: null
			}
		}),
		computed: {
			currentUser() {
				return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
			},
			inputStyle() {
				return this.$store.getters.inputStyle;
			}
		},
		methods: {
			validate() {
				this.errors = [];
				if (this.$refs.form.validate()) {
					this.loading = true;
					this.$store
						.dispatch(`${AUTH_NAMESPACE}/updateUserData`, this.form)
						.then(() => {
							this.loading = false;
						})
						.catch(rej => {
							this.loading = false;
							this.errors = rej.response.data.errors;
						});
				}
			}
		},
		beforeMount() {
			for (let property in this.form) {
				this.form[property] = this.currentUser.info[property] || '';
			}
		}
	};
</script>

<style></style>
