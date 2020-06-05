<template>
	<v-card class="w-100" flat>
		<v-card-text>
			<v-row>
				<v-col cols="12" sm="6" md="3">
					<v-sheet class="boxShadow border-radius mb-6">
						<v-list-item class="pl-5 py-2 pr-3" two-line>
							<v-list-item-avatar size="45">
								<v-icon x-large color="primary lighten-2"
									>mdi-plus</v-icon
								>
							</v-list-item-avatar>
							<v-list-item-content class="pa-0">
								<v-list-item-title class="mb-1"
									>Total Patients</v-list-item-title
								>
								<v-list-item-subtitle
									v-if="dashboard"
									class="title primary--text"
									>{{ dashboard.totalPatient }}</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>
					</v-sheet>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<v-sheet class="boxShadow border-radius mb-6">
						<v-list-item class="pl-5 py-2 pr-3" two-line>
							<v-list-item-avatar size="45">
								<v-icon x-large color="primary lighten-2"
									>mdi-plus</v-icon
								>
							</v-list-item-avatar>
							<v-list-item-content class="pa-0">
								<v-list-item-title class="mb-1"
									>Today Patients</v-list-item-title
								>
								<v-list-item-subtitle
									v-if="dashboard"
									class="title primary--text"
									>{{ dashboard.todayPatient }}</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>
					</v-sheet>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<v-sheet class="boxShadow border-radius mb-6">
						<v-list-item class="pl-5 py-2 pr-3" two-line>
							<v-list-item-avatar size="45">
								<v-icon x-large color="primary lighten-2"
									>mdi-plus</v-icon
								>
							</v-list-item-avatar>
							<v-list-item-content class="pa-0">
								<v-list-item-title class="mb-1"
									>Total Sessions</v-list-item-title
								>
								<v-list-item-subtitle
									v-if="dashboard"
									class="title primary--text"
									>{{ dashboard.totalSession }}</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>
					</v-sheet>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<v-sheet class="boxShadow border-radius mb-6">
						<v-list-item class="pl-5 py-2 pr-3" two-line>
							<v-list-item-avatar size="45">
								<v-icon x-large color="primary lighten-2"
									>mdi-plus</v-icon
								>
							</v-list-item-avatar>
							<v-list-item-content class="pa-0">
								<v-list-item-title class="mb-1"
									>Today Sessions</v-list-item-title
								>
								<v-list-item-subtitle
									v-if="dashboard"
									class="title primary--text"
									>{{ dashboard.todaySession }}</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>
					</v-sheet>
				</v-col>
				<v-col cols="12">
					<v-card class="mt-10 " elevation="1">
						<v-sheet
							class="v-sheet--offset mx-auto boxShadow"
							color="primary lighten-2"
							max-width="calc(100% - 32px)"
						>
							<v-sparkline
								:value="dashboard ? dashboard.values : []"
								height="80"
								padding="10"
								color="white"
								stroke-linecap="round"
								gradient-direction="top"
								smooth
								:line-width="1"
								show-labels
								auto-line-width
								auto-draw
							>
								<template v-slot:label="item">
									{{ item.value }}
								</template>
							</v-sparkline>
							<div class="px-2 d-flex justify-space-between">
								<time>{{ new Date().toDateString() }}</time>
								<time>{{
									new Date(
										new Date().getTime() - 9 * 24 * 60 * 60 * 1000
									).toDateString()
								}}</time>
							</div>
						</v-sheet>

						<v-card-text class="pt-0">
							<div class="title font-weight-light mb-2">
								Patients Last 10days
							</div>

							<v-divider class="my-2"></v-divider>
							<v-icon class="mr-2" small>
								mdi-clock
							</v-icon>
							<span class="caption grey--text font-weight-light"
								>The drawing shows the number of patients per day in the
								last 10 days
							</span>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="12">
					<h2 class="headline black--text my-4">Today Patients</h2>
					<v-data-table
						:headers="headers"
						:items="dashboard ? dashboard.lastPatient : []"
						class="elevation-0 cTable"
						:loading="loading"
						disable-pagination
						disable-sort
						hide-default-footer
					>
						<template v-slot:item.phone="{ item }">
							<a :href="`tel:${item.phone}`" class="customLink">{{
								item.phone
							}}</a>
						</template>
						<template v-slot:item.age="{ item }">
							<v-chip v-if="item.age" color="#A5C13D">{{
								item.age
							}}</v-chip>
						</template>

						<template v-slot:item.name="{ item }">
							<router-link
								:to="`patients/${item.id}`"
								class="customLink"
								>{{ item.name }}</router-link
							>
						</template>

						<template v-slot:no-data>
							There is no patients today yet
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	import { DASH_NAMESPACE } from '../../../store/modules/namespaces';

	export default {
		computed: {
			dashboard() {
				return this.$store.getters[`${DASH_NAMESPACE}/data`];
			}
		},
		data() {
			return {
				headers: [
					{ text: 'ID', value: 'id' },
					{ text: 'Name', value: 'name' },
					{ text: 'Phone', value: 'phone' },
					{ text: 'Age', value: 'age' },
					{ text: 'Gender', value: 'gender' },
					{ text: 'Address', value: 'address' },
					{ text: 'Date', value: 'created_at' }
				],
				loading: false
			};
		},
		created() {
			this.loading = true;
			this.$store.dispatch(`${DASH_NAMESPACE}/getData`).then(() => {
				this.loading = false;
			});
		}
	};
</script>

<style lang="scss">
	.v-sheet--offset {
		top: -40px;
		position: relative;
	}
</style>
