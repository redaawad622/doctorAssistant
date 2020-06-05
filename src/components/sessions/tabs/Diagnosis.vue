<template>
	<v-card flat>
		<v-card-text>
			<v-simple-table fixed-header class="cTable">
				<template v-slot:default>
					<thead>
						<tr>
							<td colspan="8" class="body-1">Diagnosis</td>
							<td colspan="2" class="body-1">Action</td>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in diagnosiss"
							:key="item.diagnosis + index"
						>
							<td colspan="8" class=" pa-2" v-text="item.diagnosis"></td>
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
							<td colspan="8" class="pa-0">
								<v-combobox
									v-model="diag"
									:items="diagnosis"
									label="Diagnosis"
									hide-details="auto"
									:loading="loading"
									cache-items
									chips
									clearable
									solo
									multiple
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
		</v-card-text>
		<v-row justify="center">
			<v-dialog :value="dialog" max-width="500" persistent>
				<v-card>
					<v-card-title class="headline text-capitalize">
						Update diagnosis</v-card-title
					>
					<v-card-text>
						<v-textarea
							v-model="editedItem.diagnosis"
							label="diagnosis"
							:error-messages="error"
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
		SESSION_NAMESPACE
	} from '../../../store/modules/namespaces';

	export default {
		computed: {
			inputStyle() {
				return this.$store.getters.inputStyle;
			},
			btnStyle() {
				return this.$store.getters.btnStyle;
			},
			diagnosis() {
				return this.$store.getters[`${TEMPLATES_NAMESPACE}/diagnosis`];
			},
			diagnosiss: {
				get() {
					return (
						this.$store.getters[`${SESSION_NAMESPACE}/diagnosis`] || []
					);
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/diagnosis`, val);
				}
			}
		},
		data() {
			return {
				loading: false,
				editedItem: { diagnosis: '' },
				dialog: false,
				index: null,
				diag: [],
				error: ''
			};
		},
		methods: {
			close() {
				this.dialog = false;
				this.index = null;
				this.editedItem = { diagnosis: '' };
				this.error = '';
			},
			open(index) {
				this.dialog = true;
				this.index = index;
				this.editedItem = { ...this.diagnosiss[index] };
			},
			deleteMed(key) {
				const arr = [...this.diagnosiss];
				arr.splice(key, 1);
				this.diagnosiss = arr;
			},
			editMed() {
				this.error = '';
				if (!this.editedItem.diagnosis) {
					return (this.error = 'field is required');
				}
				const arr = [...this.diagnosiss];
				arr[this.index] = this.editedItem;
				this.diagnosiss = arr;
				this.close();
			},
			addMed() {
				if (this.diag.length > 0) {
					const arr = [...this.diagnosiss];
					this.diag.forEach(elm => {
						arr.push({ diagnosis: elm });
					});

					this.diagnosiss = arr;
					this.diag = [];
				}
			}
		},
		created() {
			this.loading = true;
			this.$store
				.dispatch(`${TEMPLATES_NAMESPACE}/getDiagnosis`)
				.then(() => {
					this.loading = false;
				});
		}
	};
</script>

<style></style>
