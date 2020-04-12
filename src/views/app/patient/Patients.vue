<template>
	<v-card class="w-100" flat>
		<v-card-title class="display-1 font-weight-bold text-capitalize"
			>Patients</v-card-title
		>
		<v-card-text>
			<v-data-table
				:headers="headers"
				:items="patients"
				sort-by="id"
				must-sort
				:options.sync="options"
				class="elevation-0"
				:server-items-length="meta.total || 0"
				:loading="loading"
			>
				<template v-slot:item.phone="{ item }">
					<a :href="`tel:${item.phone}`" class="customLink">{{
						item.phone
					}}</a>
				</template>
				<template v-slot:item.age="{ item }">
					<v-chip v-if="item.age" color="#A5C13D">{{ item.age }}</v-chip>
				</template>

				<template v-slot:item.name="{ item }">
					<router-link :to="`patients/${item.id}`" class="customLink">{{
						item.name
					}}</router-link>
				</template>
				<template v-slot:item.actions="{ item }">
					<div class="d-flex">
						<v-btn
							@click="editItem(item)"
							x-small
							color="primary"
							class="white--text mr-2"
							fab
						>
							<v-icon>
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn
							@click="deleteItem = item"
							x-small
							color="red"
							class="white--text"
							fab
						>
							<v-icon>
								mdi-delete
							</v-icon>
						</v-btn>
					</div>
				</template>
				<template v-slot:no-data>
					<v-btn color="primary" @click="getPatient">Reset</v-btn>
				</template>
			</v-data-table>
		</v-card-text>
		<v-row justify="center">
			<v-dialog :value="true" v-if="deleteItem" persistent max-width="290">
				<v-card :loading="deleteLoading">
					<v-card-title class="headline"
						>Delete Patient {{ deleteItem.name }}?</v-card-title
					>
					<v-card-text
						>Are you sure you want delete this patient? by clicking agree
						the patient will removed and their sessions</v-card-text
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" text @click="deleteItem = null"
							>Disagree</v-btn
						>
						<v-btn
							color="green darken-1"
							text
							:loading="deleteLoading"
							@click="deletePatient(deleteItem)"
							>Agree</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
		<v-fab-transition>
			<v-btn
				color="primary"
				style="bottom:70px"
				elevation="5"
				dark
				bottom
				right
				fixed
				fab
				@click="setDialog(true)"
			>
				<v-icon class="display-2 font-weight-bold">mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-card>
</template>
<script>
	import { PATIENTS_NAMESPACE } from '../../../store/modules/namespaces';
	import { mapGetters } from 'vuex';
	export default {
		data: () => ({
			options: {},
			deleteItem: null,
			deleteLoading: false,
			headers: [
				{ text: 'ID', value: 'id' },
				{ text: 'Name', value: 'name' },
				{ text: 'Phone', value: 'phone' },
				{ text: 'Age', value: 'age' },
				{ text: 'Gender', value: 'gender' },
				{ text: 'Address', value: 'address' },
				{ text: 'Date', value: 'created_at' },
				{ text: 'Actions', value: 'actions', sortable: false }
			]
		}),
		computed: {
			...mapGetters(PATIENTS_NAMESPACE, ['patients', 'meta', 'loading'])
		},

		methods: {
			setDialog(val) {
				this.$store.commit(`${PATIENTS_NAMESPACE}/updateDialog`, val);
			},
			setItem(val) {
				this.$store.commit(`${PATIENTS_NAMESPACE}/updateEditItem`, val);
			},
			getPatient(perPage = 10, page = 1, sortBy = 'id', desc = false) {
				this.$store.dispatch(`${PATIENTS_NAMESPACE}/getPatients`, {
					perPage: perPage,
					page: page,
					sortBy: sortBy,
					desc: desc
				});
			},
			editItem(item) {
				this.setItem(item);
				this.setDialog(true);
			},

			deletePatient(item) {
				const index = this.patients.indexOf(item);
				this.deleteLoading = true;
				this.$store
					.dispatch(`${PATIENTS_NAMESPACE}/deletePatient`, {
						id: item.id
					})
					.then(() => {
						this.$store.commit(
							`${PATIENTS_NAMESPACE}/deletePatient`,
							index
						);
						this.deleteItem = null;
						this.deleteLoading = false;
					})
					.catch(() => {
						this.deleteLoading = false;
					});
			},

			save() {
				if (this.editedIndex > -1) {
					Object.assign(this.patients[this.editedIndex], this.editedItem);
				} else {
					this.patients.push(this.editedItem);
				}
				this.close();
			}
		},
		watch: {
			options(val) {
				let per = val.itemsPerPage;
				if (per == -1) {
					per = this.meta.total;
				}
				this.getPatient(per, val.page, val.sortBy[0], val.sortDesc[0]);
			}
		}
	};
</script>
