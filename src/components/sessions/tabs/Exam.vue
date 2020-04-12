<template>
	<v-card flat>
		<v-card flat class="pa-0 ma-3" outlined>
			<v-btn
				icon
				outlined
				x-small
				:color="!toggle ? 'red' : ''"
				@click="toggle = !toggle"
				absolute
				style="z-index:2;top:-10px; right:-5px"
				><v-icon>mdi-plus</v-icon></v-btn
			>
			<v-tabs v-model="tab" grow>
				<v-tab v-for="item in tabs" :key="item.tab">
					{{ item.tab }}
				</v-tab>
			</v-tabs>

			<v-card-text v-show="toggle">
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<custom-select
							v-model="UC_VA_R"
							:items="VA_List"
							label="UC_VA"
						></custom-select>

						<custom-select
							v-model="BC_VA_R"
							:items="VA_List"
							label="BC_VA"
						></custom-select>
						<fileUpload v-model="filesR"></fileUpload>
						<filePreview
							v-if="multipartR && multipartR.length > 0"
							v-model="multipartR"
						></filePreview>
					</v-tab-item>
					<v-tab-item>
						<custom-select
							v-model="UC_VA_L"
							:items="VA_List"
							label="UC_VA"
						></custom-select>

						<custom-select
							v-model="BC_VA_L"
							:items="VA_List"
							label="BC_VA"
						></custom-select>
						<fileUpload v-model="filesL"></fileUpload>
						<filePreview
							v-if="multipartL && multipartL.length > 0"
							v-model="multipartL"
						></filePreview>
					</v-tab-item>
				</v-tabs-items>
			</v-card-text>
		</v-card>
		<v-card-text>
			<v-combobox
				v-model="description"
				:items="examination"
				label="Examination"
				multiple
				:loading="loading"
				cache-items
				chips
				clearable
				v-bind="inputStyle"
				deletable-chips
				full-width
				open-on-clear
			>
			</v-combobox>
			<v-checkbox
				class="mt-0 pt-0"
				label="save as a template"
				v-model="saveAsTemplate"
			></v-checkbox>
		</v-card-text>
	</v-card>
</template>

<script>
	import {
		SESSION_NAMESPACE,
		LIST_NAMESPACE,
		TEMPLATES_NAMESPACE
	} from '../../../store/modules/namespaces';
	import customSelect from '../../common/customSelect';
	import fileUpload from '../fileUpload';
	import filePreview from '../filePreview';
	export default {
		name: 'Exam',
		data() {
			return {
				tab: null,
				tabs: [{ tab: 'Right Eye' }, { tab: 'Left Eye' }],
				toggle: true,
				loading: false
			};
		},
		components: {
			customSelect,
			fileUpload,
			filePreview
		},
		computed: {
			inputStyle() {
				return this.$store.getters.inputStyle;
			},
			examination() {
				return this.$store.getters[
					`${TEMPLATES_NAMESPACE}/examination`
				].map(item => {
					return item.content;
				});
			},
			description: {
				get() {
					return (
						this.$store.getters[`${SESSION_NAMESPACE}/examination`][
							'description'
						] || []
					);
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'description',
						value: val
					});
				}
			},
			saveAsTemplate: {
				get() {
					return (
						this.$store.getters[`${SESSION_NAMESPACE}/examination`][
							'saveAsTemplate'
						] || false
					);
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'saveAsTemplate',
						value: val
					});
				}
			},
			VA_List() {
				return this.$store.getters[`${LIST_NAMESPACE}/VA_List`];
			},
			UC_VA_R: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'UC_VA_R'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'UC_VA_R',
						value: val
					});
				}
			},
			BC_VA_R: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'BC_VA_R'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'BC_VA_R',
						value: val
					});
				}
			},
			UC_VA_L: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'UC_VA_L'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'UC_VA_L',
						value: val
					});
				}
			},
			BC_VA_L: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'BC_VA_L'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'BC_VA_L',
						value: val
					});
				}
			},
			filesR: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'examination_multiple_r'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'examination_multiple_r',
						value: val
					});
				}
			},
			multipartR: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'multipart_r'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'multipart_r',
						value: val
					});
				}
			},
			filesL: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'examination_multiple_l'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'examination_multiple_l',
						value: val
					});
				}
			},
			multipartL: {
				get() {
					return this.$store.getters[`${SESSION_NAMESPACE}/examination`][
						'multipart_l'
					];
				},
				set(val) {
					this.$store.commit(`${SESSION_NAMESPACE}/examination`, {
						name: 'multipart_l',
						value: val
					});
				}
			}
		},
		created() {
			this.loading = true;
			this.$store
				.dispatch(`${TEMPLATES_NAMESPACE}/getExamination`)
				.then(() => {
					this.loading = false;
				});
		}
	};
</script>

<style lang="scss" scoped></style>