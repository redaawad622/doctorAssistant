<template>
	<v-row justify="center">
		<v-dialog :value="value" max-width="500" persistent>
			<v-card :loading="loading">
				<v-card-title class="headline text-capitalize">
					{{
						item ? 'Update Patient ' + item.name : 'Create a New Patient'
					}}</v-card-title
				>

				<v-card-text>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-text-field
							v-model="form.name"
							:rules="nameRules"
							label="Name"
							required
							v-bind="inputStyle"
							clearable
							dense
						></v-text-field>
						<v-text-field
							v-model="form.phone"
							label="Phone"
							required
							v-bind="inputStyle"
							clearable
							dense
						></v-text-field>
						<v-row>
							<v-col cols="6">
								<v-text-field
									v-model="form.age"
									:rules="ageRules"
									label="Age"
									required
									v-bind="inputStyle"
									clearable
									dense
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-select
									:items="items"
									label="Gender"
									v-model="form.gender"
									required
									v-bind="inputStyle"
									dense
								></v-select>
							</v-col>
							<v-textarea
								v-model="form.address"
								label="Address"
								required
								v-bind="inputStyle"
								clearable
								dense
								auto-grow
								no-resize
								rows="2"
							>
							</v-textarea>
						</v-row>
					</v-form>
					<v-alert
						type="error"
						dense
						text
						v-for="(item, key) in errors"
						:key="`error${key}`"
					>
						{{ item }}
					</v-alert>
				</v-card-text>

				<v-card-actions class="back justify-space-between py-4">
					<v-btn
						color="red darken-1"
						class="white--text font-weight-medium text-capitalize elevation-5 text-capitalize"
						@click="$emit('input', false)"
					>
						cancel
					</v-btn>
					<v-btn
						color="primary"
						class="white--text font-weight-medium text-capitalize elevation-5 text-capitalize"
						@click="validate()"
						:loading="loading"
					>
						{{ item ? 'Update Patient' : 'Add Patient' }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	import { PATIENTS_NAMESPACE } from '../../store/modules/namespaces';
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			item: {
				get() {
					return this.$store.getters[`${PATIENTS_NAMESPACE}/editItem`];
				},
				set(val) {
					this.$store.commit(`${PATIENTS_NAMESPACE}/updateEditItem`, val);
				}
			},
			inputStyle() {
				return this.$store.getters.inputStyle;
			}
		},
		data() {
			return {
				valid: true,
				loading: false,
				nameRules: [
					v => !!v || 'field is required',
					v => v.length > 1 || 'field must be at least 2 characters'
				],
				ageRules: [
					v => v.length < 10 || 'field must be at less than 10 characters'
				],
				form: {
					name: '',
					gender: 'male',
					age: '',
					phone: '',
					address: ''
				},
				errors: [],
				items: ['male', 'female']
			};
		},
		methods: {
			validate() {
				this.errors = [];
				if (this.$refs.form.validate()) {
					this.loading = true;
					if (this.item) {
						this.form['_method'] = 'patch';
					}
					this.$store
						.dispatch(`${PATIENTS_NAMESPACE}/create`, this.form)
						.then(() => {
							this.loading = false;
							this.$emit('input', false);
						})
						.catch(rej => {
							console.log(rej);
							this.loading = false;
							this.errors = rej.response.data.errors;
						});
				}
			}
		},
		destroyed() {
			this.item = null;
		},
		beforeMount() {
			if (this.item) {
				for (let item in this.item) {
					if (this.item[item]) {
						this.form[item] = this.item[item];
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
