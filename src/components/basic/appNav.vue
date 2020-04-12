<template>
	<v-app-bar
		app
		:color="!$vuetify.theme.dark ? '#fff' : null"
		elevate-on-scroll
	>
		<v-app-bar-nav-icon
			v-if="mini && !$vuetify.breakpoint.xs"
			@click.stop="$emit('mini')"
		/>
		<v-autocomplete
			v-model="select"
			:loading="searchLoading"
			:items="searchItems"
			:search-input.sync="search"
			class="mx-4"
			hide-no-data
			hide-details
			label="search for patients..."
			prepend-inner-icon="mdi-magnify "
			clearable
			dense
			v-bind="inputStyle"
			no-filter
			:menu-props="{ closeOnContentClick: true }"
			style="max-width:400px"
		>
			<template v-slot:selection="{ attr, on, item, selected }">
				<v-chip
					v-bind="attr"
					:input-value="selected"
					color="blue-grey"
					class="white--text"
					v-on="on"
					small
				>
					<v-icon left>mdi-coin</v-icon>
					<span v-text="item.name"></span>
				</v-chip>
			</template>
			<template v-slot:item="{ item }">
				<v-list-item link :to="`/patients/${item.id}`">
					<v-list-item-avatar
						color="indigo"
						class="headline font-weight-light white--text"
					>
						{{ item.name.charAt(0) }}
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="item.name"></v-list-item-title>
						<v-list-item-subtitle
							v-text="item.gender"
						></v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-icon>mdi-coin</v-icon>
					</v-list-item-action>
				</v-list-item>
			</template>
		</v-autocomplete>
		<v-menu bottom offset-y>
			<template v-slot:activator="{ on }">
				<v-btn icon class="mx-3 ms-auto" v-on="on">
					<v-avatar :size="$vuetify.breakpoint.xs ? '40' : '48'"
						><v-img :src="`${$imgPath}doctor.png`" alt="avater"></v-img
					></v-avatar>
					<v-icon v-if="!$vuetify.breakpoint.xs">mdi-chevron-down </v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item link to="/editProfile">
					<v-list-item-title>Edit account</v-list-item-title>
				</v-list-item>
				<v-list-item @click="logout">
					<v-list-item-title>logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<template v-slot:extension v-if="$vuetify.theme.layout === 'Horizontal'">
			<v-tabs
				hide-slider
				grow
				:background-color="!$vuetify.theme.dark && '#FBFBFB'"
			>
				<v-tab v-for="item in items" :key="item.name" link :to="item.link">
					{{ item.name }}
				</v-tab>

				<v-menu v-if="more.length" bottom left>
					<template v-slot:activator="{ on }">
						<v-btn text class="align-self-center mr-4" v-on="on">
							Templates
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn>
					</template>

					<v-list class="grey lighten-3">
						<v-list-item
							v-for="item in more"
							:key="'template' + item.name"
							@click="addItem(item)"
						>
							{{ item.name }}
						</v-list-item>
					</v-list>
				</v-menu>
			</v-tabs>
		</template>
	</v-app-bar>
</template>

<script>
	import {
		AUTH_NAMESPACE,
		PATIENT_NAMESPACE
	} from '../../store/modules/namespaces';
	import { mapGetters } from 'vuex';
	export default {
		props: {
			mini: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			logout() {
				this.$store.dispatch(`${AUTH_NAMESPACE}/logout`);
			},

			addItem(item) {
				const removed = this.items.splice(2, 1);
				this.items.push(...this.more.splice(this.more.indexOf(item), 1));
				this.more.push(...removed);
				this.$nextTick(() => {
					this.$router.push(item.link);
				});
			}
		},
		computed: {
			...mapGetters(PATIENT_NAMESPACE, ['searchItems', 'searchLoading']),
			inputStyle() {
				return this.$store.getters.inputStyle;
			}
		},
		data() {
			return {
				search: null,
				select: null,
				loading: false,
				items: [
					{ name: 'Home', link: '/' },
					{ name: 'Patient', link: '/patients' },
					{ name: 'Complaint', link: '/template/complaint' },
					{ name: 'History', link: '/template/history' },
					{ name: 'Examination', link: '/template/examination' }
				],
				more: [
					{ name: 'Medicines', link: '/template/medicines' },
					{ name: 'Doses', link: '/template/doses' },
					{ name: 'Diagnosis', link: '/template/diagnosis' },
					{ name: 'Requests', link: '/template/requests' }
				]
			};
		},
		watch: {
			search(val) {
				if (val) {
					this.$store.dispatch(`${PATIENT_NAMESPACE}/searchPatient`, {
						val: val
					});
				}
			}
		}
	};
</script>

<style></style>
