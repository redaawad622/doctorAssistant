<template>
	<v-card flat>
		<v-card-text>
			<v-simple-table fixed-header max-height="600px" class="cTable">
				<template v-slot:default>
					<thead>
						<tr>
							<td colspan="5" class="body-1">Medicine</td>
							<td colspan="5" class="body-1">Dose</td>
							<td colspan="2" class="body-1">Action</td>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in medicines"
							:key="item.medicine + index"
						>
							<td colspan="5" class=" pa-2" v-text="item.medicine"></td>
							<td colspan="5" class=" pa-2" v-text="item.dose"></td>
							<td colspan="2" class="d-flex align-center pa-2">
								<v-btn
									max-width="35px"
									min-width="35px"
									height="35px"
									rounded
									@click="open(index)"
									v-bind="btnStyle"
									class="mx-2"
									color="#A5C13D"
									:class="{
										'white--text':
											!btnStyle.outlined && !btnStyle.text
									}"
									><v-icon>mdi-square-edit-outline</v-icon></v-btn
								>
								<v-btn
									max-width="35px"
									min-width="35px"
									height="35px"
									rounded
									color="red"
									:class="{
										'white--text':
											!btnStyle.outlined && !btnStyle.text
									}"
									@click="deleteMed(index)"
									v-bind="btnStyle"
									><v-icon>mdi-trash-can-outline </v-icon></v-btn
								>
							</td>
						</tr>
						<tr
							:class="{
								'grey lighten-3': !$vuetify.theme.dark,
								'black lighten-3': $vuetify.theme.dark
							}"
						>
							<td colspan="5" class="pa-0">
								<v-combobox
									v-model="med"
									:items="medicine"
									label="Medicine"
									:loading="loading"
									cache-items
									hide-details="auto"
									clearable
									solo
									chips
									multiple
									flat
									deletable-chips
									full-width
									open-on-clear
									background-color="transparent"
								>
								</v-combobox>
							</td>
							<td colspan="5" class="pa-0">
								<v-combobox
									v-model="dose"
									:items="doses"
									label="Doses"
									hide-details="auto"
									:loading="loading"
									cache-items
									chips
									clearable
									solo
									flat
									deletable-chips
									full-width
									open-on-clear
									background-color="transparent"
								>
								</v-combobox>
							</td>
							<td colspan="2">
								<v-btn
									:rounded="inputStyle.rounded"
									color="primary"
									large
									v-bind="btnStyle"
									@click="addMed"
									><v-icon>mdi-plus</v-icon> Add</v-btn
								>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
			<v-divider></v-divider>
			<v-btn
				text
				class="my-4 mx-0 px-0"
				@click="toggle = !toggle"
				color="primary"
				>Do you want to change this patient's data ?</v-btn
			>
			<v-fade-transition>
				<v-form ref="form" v-model="valid" v-show="toggle" lazy-validation>
					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Name"
						required
						v-bind="inputStyle"
						clearable
						dense
					></v-text-field>

					<v-row>
						<v-col cols="6">
							<v-text-field
								v-model="age"
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
								v-bind="inputStyle"
								label="Gender"
								v-model="gender"
								required
								dense
							></v-select>
						</v-col>
						<v-menu
							v-model="menu2"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									v-model="selectedDate"
									label="selsect session date"
									readonly
									v-bind="inputStyle"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="selectedDate"
								:value="
									selectedDate ||
										new Date().toISOString().substr(0, 10)
								"
								@input="menu2 = false"
							></v-date-picker>
						</v-menu>
					</v-row>
				</v-form>
			</v-fade-transition>
		</v-card-text>

		<v-row justify="center">
			<v-dialog :value="dialog" max-width="500" persistent>
				<v-card>
					<v-card-title class="headline text-capitalize">
						Update medicine</v-card-title
					>
					<v-card-text>
						<v-textarea
							v-model="editedItem.medicine"
							label="medicine name"
							:error-messages="error"
							v-bind="inputStyle"
							clearable
							auto-grow
						></v-textarea>
						<v-textarea
							v-model="editedItem.dose"
							label="dose"
							required
							v-bind="inputStyle"
							clearable
							auto-grow
						></v-textarea>
					</v-card-text>

					<v-card-actions class="back justify-space-between py-4">
						<v-btn
							color="red darken-1"
							class="white--text font-weight-medium text-capitalize text-capitalize"
							@click="close()"
							v-bind="btnStyle"
						>
							cancel
						</v-btn>
						<v-btn
							color="primary"
							class="white--text font-weight-medium text-capitalize text-capitalize"
							@click="editMed()"
							v-bind="btnStyle"
						>
							Update
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-card>
</template>

<script>
	import {
		TEMPLATES_NAMESPACE,
		SESSION_NAMESPACE,
		PATIENT_NAMESPACE
	} from '../../../store/modules/namespaces';

	export default {
		components: {},
		computed: {
			inputStyle() {
				return this.$store.getters.inputStyle;
			},
			btnStyle() {
				return this.$store.getters.btnStyle;
			},
			medicine() {
				return this.$store.getters[`${TEMPLATES_NAMESPACE}/medicine`];
			},
			doses() {
				return this.$store.getters[`${TEMPLATES_NAMESPACE}/doses`];
			},
			medicines: {
				get() {
					return (
						this.$store.getters[`${SESSION_NAMESPACE}/medicines`] || []
					);
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/medicines`, val);
				}
			},
			name: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/userData`][
						'name'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/userData`, {
						name: 'name',
						value: val
					});
				}
			},
			age: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/userData`][
						'age'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/userData`, {
						name: 'age',
						value: val
					});
				}
			},
			gender: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/userData`][
						'gender'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/userData`, {
						name: 'gender',
						value: val
					});
				}
			},
			selectedDate: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/userData`][
						'selectedDate'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/userData`, {
						name: 'selectedDate',
						value: val
					});
				}
			}
		},
		data() {
			return {
				loading: false,
				doseLoading: false,
				med: [],
				editedItem: { medicine: '', dose: '' },
				dialog: false,
				index: null,
				dose: '',
				valid: true,
				requireRule: [v => !!v || 'field is required'],
				error: '',
				items: ['male', 'female'],
				toggle: false,
				menu2: false,
				nameRules: [
					v => !!v || 'field is required',
					v =>
						(!!v && v.length > 1) || 'field must be at least 2 characters'
				],
				ageRules: [
					v => {
						return v
							? v.length < 7 || 'field must be at less than 7 characters'
							: true;
					}
				]
			};
		},
		methods: {
			close() {
				this.dialog = false;
				this.index = null;
				this.editedItem = { medicine: '', dose: '' };
				this.error = '';
			},
			open(index) {
				this.dialog = true;
				this.index = index;
				this.editedItem = { ...this.medicines[index] };
			},
			deleteMed(key) {
				const arr = [...this.medicines];
				arr.splice(key, 1);
				this.medicines = arr;
			},
			editMed() {
				this.error = '';
				if (!this.editedItem.medicine) {
					return (this.error = 'field is required');
				}
				const arr = [...this.medicines];
				arr[this.index] = this.editedItem;
				this.medicines = arr;
				this.close();
			},
			addMed() {
				if (this.med.length > 0 && this.dose) {
					const arr = [...this.medicines];
					this.med.forEach(elm => {
						arr.push({ medicine: elm, dose: this.dose });
					});

					this.medicines = arr;
					this.med = [];
					this.dose = '';
				}
			}
		},
		mounted() {
			if (!this.$store.getters[`${SESSION_NAMESPACE}/isUpdate`]) {
				const patient = this.$store.getters[`${PATIENT_NAMESPACE}/patient`];
				this.name = patient.name;
				this.age = patient.age;
				this.gender = patient.gender;
			}
		},
		created() {
			this.loading = true;
			this.$store.dispatch(`${TEMPLATES_NAMESPACE}/getMedicine`).then(() => {
				this.loading = false;
			});
			this.doseLoading = true;
			this.$store.dispatch(`${TEMPLATES_NAMESPACE}/getDoses`).then(() => {
				this.doseLoading = false;
			});
		}
	};
</script>

<style lang="scss" scoped>
	.table {
		width: 100%;
		text-align: center;
	}
</style>
