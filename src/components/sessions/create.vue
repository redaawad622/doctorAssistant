<template>
	<v-row justify="center">
		<v-dialog
			:value="value"
			@input="$emit('input', false)"
			persistent
			scrollable
			fullscreen
		>
			<v-card :loading="loading" class="d-flex flex-column">
				<v-card-title class="headline text-capitalize">
					{{
						session.id ? 'Update session ' : 'Create a New Session'
					}}</v-card-title
				>
				<v-card-text
					v-if="sessionLoading"
					class="d-flex justify-center align-center"
				>
					<v-progress-circular indeterminate></v-progress-circular>
				</v-card-text>
				<v-card-text class="px-0" v-else>
					<v-tabs
						v-model="tab"
						hide-slider
						grow
						:background-color="!$vuetify.theme.dark && '#FBFBFB'"
					>
						<v-tab v-for="item in tabs" :key="item.tab">
							{{ item.tab }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="tab">
						<v-tab-item v-for="item in tabs" :key="item.tab">
							<component :is="item.component"></component>
						</v-tab-item>
					</v-tabs-items>
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

				<v-card-actions class="back justify-space-between py-4 mt-auto">
					<v-btn
						color="red darken-1"
						class="white--text font-weight-medium text-capitalize elevation-5 text-capitalize"
						@click="$emit('input', false)"
					>
						close
					</v-btn>
					<v-btn
						color="primary"
						class="white--text font-weight-medium text-capitalize elevation-5 text-capitalize"
						@click="saveSession()"
						:loading="saveSessionLoading"
					>
						{{ session.id ? 'Update session' : 'Save session' }}
					</v-btn>
				</v-card-actions>
				<v-overlay v-if="saveSessionLoading">
					<v-progress-circular
						:value="percentage"
						:size="50"
						color="primary"
						:indeterminate="percentage == 100"
						>{{ percentage }}</v-progress-circular
					>
				</v-overlay>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	import Complaint from './tabs/Complaint';
	import History from './tabs/History';
	import Examination from './tabs/Exam';
	import {
		SESSION_NAMESPACE,
		PATIENT_NAMESPACE
	} from '../../store/modules/namespaces';
	import { mapGetters } from 'vuex';
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			sessionId: {
				type: [String, Number],
				default: null
			}
		},
		components: {
			Complaint,
			History,
			Examination
		},
		data() {
			return {
				sessionLoading: false,
				saveSessionLoading: false,
				tab: null,
				tabs: [
					{ tab: 'Complaint', component: 'Complaint' },
					{ tab: 'History', component: 'History' },
					{ tab: 'Examination', component: 'Examination' },
					{ tab: 'Medicine', component: 'Medicine' },
					{ tab: 'Glass', component: 'Glass' },
					{ tab: 'Requests', component: 'Requests' },
					{ tab: 'Diagnosis', component: 'Diagnosis' }
				],
				loading: false,
				errors: []
			};
		},
		computed: {
			...mapGetters(PATIENT_NAMESPACE, ['patient', 'sessions']),
			...mapGetters(SESSION_NAMESPACE, ['percentage', 'session'])
		},
		methods: {
			validate() {
				this.errors = [];
			},
			getSession() {
				this.sessionLoading = true;
				this.$store
					.dispatch(`${SESSION_NAMESPACE}/getSession`, {
						id: this.sessionId
					})
					.then(() => {
						this.sessionLoading = false;
					});
			},
			saveSession() {
				this.saveSessionLoading = true;
				if (!this.session.id) {
					this.$store
						.dispatch(`${SESSION_NAMESPACE}/saveSession`, {
							patient_id: this.patient.id
						})
						.then(res => {
							this.saveSessionLoading = false;
							const session = res.data.session;
							this.$store.commit(
								`${PATIENT_NAMESPACE}/unshiftSessions`,
								{
									id: session.id,
									created_at: session.created_at
								}
							);
							this.$emit('updateSession', session.id);
						})
						.catch(() => {
							this.saveSessionLoading = false;
						});
				} else {
					this.$store
						.dispatch(`${SESSION_NAMESPACE}/updateSession`, {
							patient_id: this.patient.id
						})
						.then(() => {
							this.saveSessionLoading = false;
						})
						.catch(() => {
							this.saveSessionLoading = false;
						});
				}
			}
		},
		watch: {
			sessionId(val) {
				if (val !== this.session.id) {
					this.getSession();
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
