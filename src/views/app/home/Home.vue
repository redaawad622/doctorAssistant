<template>
	<v-card class="w-100" flat>
		<v-card-text>
			<h2 class="headline black--text my-4">Today Sessions</h2>
			<v-data-table
				:headers="headers"
				:items="todaySession"
				class="elevation-0 cTable"
				:loading="loading"
				disable-pagination
				disable-sort
				hide-default-footer
			>
				<template v-slot:item.id="{ item }">
					<router-link
						:to="`patients/${item.patient_id}`"
						class="customLink"
					>
						<v-badge
							color="red"
							v-if="item.new"
							:content="item.new ? 'new' : ''"
						>
							{{ item.id }}</v-badge
						>
						<template v-else>{{ item.id }}</template>
					</router-link>
				</template>
				<template v-slot:item.phone="{ item }">
					<a :href="`tel:${item.phone}`" class="customLink">{{
						item.phone
					}}</a>
				</template>
				<template v-slot:item.age="{ item }">
					<v-chip v-if="item.age" color="#A5C13D">{{ item.age }}</v-chip>
				</template>

				<template v-slot:item.name="{ item }">
					<router-link
						:to="`patients/${item.patient_id}`"
						class="customLink"
						>{{ item.name }}</router-link
					>
				</template>

				<template v-slot:no-data>
					There is no sessions today yet
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
	import { DASH_NAMESPACE } from '../../../store/modules/namespaces';

	export default {
		computed: {
			todaySession() {
				return this.$store.getters[`${DASH_NAMESPACE}/todaySession`];
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
			this.$store.dispatch(`${DASH_NAMESPACE}/getTodaySession`).then(() => {
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
