<template>
	<v-card class="w-100" flat>
		<v-card-title class="display-1 font-weight-bold text-capitalize">{{
			title
		}}</v-card-title>
		<v-card-text>
			<v-data-table
				:headers="headers"
				:items="items"
				sort-by="id"
				must-sort
				:options.sync="options"
				class="elevation-0"
				:server-items-length="meta.total || 0"
				:loading="loading"
			>
				<template v-slot:item.actions="{ item }">
					<div class="d-flex">
						<v-btn
							max-width="35px"
							min-width="35px"
							height="35px"
							rounded
							@click="open(item)"
							v-bind="btnStyle"
							class="mx-2 lighten-2"
							color="primary"
							:class="{
								'white--text ': !btnStyle.outlined && !btnStyle.text
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
								'white--text': !btnStyle.outlined && !btnStyle.text
							}"
							@click="deleteItem = item"
							v-bind="btnStyle"
							><v-icon>mdi-trash-can-outline </v-icon></v-btn
						>
					</div>
				</template>
				<template v-slot:no-data>
					<v-btn color="primary" @click="open"
						><v-icon>mdi-plus</v-icon> create</v-btn
					>
				</template>
			</v-data-table>
		</v-card-text>
		<v-row justify="center">
			<v-dialog :value="true" v-if="deleteItem" persistent max-width="290">
				<v-card :loading="deleteLoading">
					<v-card-title class="headline">Delete template?</v-card-title>
					<v-card-text
						>Are you sure you want delete this template? by clicking agree
						the template will removed</v-card-text
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
			<v-dialog :value="dialog" max-width="500" persistent>
				<v-card :loading="addLoading">
					<v-card-title class="headline text-capitalize">
						{{
							editItem.id
								? 'Update ' + this.title
								: 'Create a New ' + this.title
						}}</v-card-title
					>

					<v-card-text>
						<v-form ref="form" v-model="valid" lazy-validation>
							<v-textarea
								v-model="editItem.content"
								:label="title"
								required
								v-bind="inputStyle"
								clearable
								dense
								:rules="requiredRules"
								auto-grow
								no-resize
								rows="3"
							>
							</v-textarea>
						</v-form>
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
							@click="editOrAdd()"
							:loading="addLoading"
							v-bind="btnStyle"
						>
							{{ editItem.id ? 'Update' : 'Add' }}
						</v-btn>
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
				v-bind="btnStyle"
				bottom
				right
				fixed
				fab
				@click="open"
			>
				<v-icon class="display-2 font-weight-bold">mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</v-card>
</template>
<script>
	import { mapGetters } from 'vuex';
	import { TEMPLATEDATA_NAMESPACE } from '../../store/modules/namespaces';
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			headers: {
				type: Array,
				default: () => [
					{ text: 'ID', value: 'id' },
					{ text: 'Content', value: 'content' },
					{ text: 'Date', value: 'created_at' },
					{ text: 'Actions', value: 'actions', sortable: false }
				]
			},
			link: {
				type: String,
				required: true
			}
		},
		data: () => ({
			options: {},
			deleteItem: null,
			deleteLoading: false,
			addLoading: false,
			dialog: false,
			editItem: { content: '' },
			valid: true,
			requiredRules: [v => !!v || 'field is required']
		}),
		computed: {
			...mapGetters(TEMPLATEDATA_NAMESPACE, ['items', 'meta', 'loading']),
			inputStyle() {
				return this.$store.getters.inputStyle;
			},
			btnStyle() {
				return this.$store.getters.btnStyle;
			}
		},

		methods: {
			getItems(perPage = 10, page = 1, sortBy = 'id', desc = false) {
				this.$store.dispatch(`${TEMPLATEDATA_NAMESPACE}/getItems`, {
					data: {
						perPage: perPage,
						page: page,
						sortBy: sortBy,
						desc: desc
					},
					link: this.link
				});
			},
			deletePatient(item) {
				const index = this.items.indexOf(item);
				this.deleteLoading = true;
				this.$store
					.dispatch(`${TEMPLATEDATA_NAMESPACE}/deleteItem`, {
						link: this.link + '/' + item.id
					})
					.then(() => {
						this.$store.commit(
							`${TEMPLATEDATA_NAMESPACE}/deleteItem`,
							index
						);
						this.deleteItem = null;
						this.deleteLoading = false;
					})
					.catch(() => {
						this.deleteLoading = false;
					});
			},
			open(item = { content: '' }) {
				this.editItem = { ...item };
				this.dialog = true;
			},
			close() {
				this.editItem = { content: '' };
				this.dialog = false;
			},
			editOrAdd() {
				this.addLoading = true;
				let link = this.link;
				let data = { content: this.editItem.content };
				if (this.editItem.id) {
					link += '/' + this.editItem.id;
					data['_method'] = 'put';
				}
				this.$store
					.dispatch(`${TEMPLATEDATA_NAMESPACE}/createOrUpdate`, {
						link: link,
						data: data
					})
					.then(() => {
						this.addLoading = null;
						this.close();
					})
					.catch(() => {
						this.addLoading = false;
					});
			}
		},
		watch: {
			options(val) {
				let per = val.itemsPerPage;
				if (per == -1) {
					per = this.meta.total;
				}
				this.getItems(per, val.page, val.sortBy[0], val.sortDesc[0]);
			}
		},
		destroyed() {
			this.$store.commit(`${TEMPLATEDATA_NAMESPACE}/reset`);
		}
	};
</script>
