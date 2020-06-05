<template>
	<v-footer
		inset
		:color="!$vuetify.theme.dark ? '#FBFBFB' : null"
		app
		class="border-color border-top-2 d-flex justify-space-between"
	>
		<div>
			<v-btn icon @click="$router.go(-1)"
				><v-icon>mdi-arrow-left</v-icon></v-btn
			>
			<v-btn icon @click="$router.go(1)"
				><v-icon>mdi-arrow-right</v-icon></v-btn
			>
			<v-btn icon @click="reload" :loading="reloadLoading"
				><v-icon>mdi-reload</v-icon></v-btn
			>
		</div>
		<span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
		<div>
			<span class="me-2">Version 1.0.1</span>
			<v-btn icon large @click="dialog = true"
				><v-icon color="primary">mdi-cogs</v-icon></v-btn
			>
		</div>
		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-title class="headline">Application Settings</v-card-title>

				<v-card-text>
					<custom-select
						:items="items"
						label="Layout"
						v-model="layout"
					></custom-select>
					<v-divider></v-divider>
					<v-subheader class="px-0" v-if="selectType !== 'chip'"
						>Input Layout</v-subheader
					>
					<custom-select
						v-model="inputShape"
						:items="shapeItems"
						label="input layout"
					></custom-select>
					<custom-select
						v-model="selectType"
						:items="['chip', 'autocomplete', 'select']"
						label="select layout"
					></custom-select>
					<v-text-field
						v-if="selectType === 'chip'"
						v-bind="inputStyle"
						label="test input"
						class="mt-3"
					></v-text-field>
					<v-divider></v-divider>
					<v-subheader class="px-0">Input Shape</v-subheader>
					<v-switch v-model="flat" label="Flat input"></v-switch>
					<v-switch v-model="shaped" label="Shaped input"></v-switch>
					<v-switch v-model="rounded" label="rounded input"></v-switch>
					<v-divider></v-divider>
					<v-subheader class="px-0" v-if="selectType !== 'chip'"
						>button style</v-subheader
					>
					<custom-select
						v-model="btnS"
						:items="['default', 'outlined', 'text']"
						label="button style"
					></custom-select>
					<v-divider></v-divider>
					<v-subheader class="px-0">Themes</v-subheader>
					<v-switch
						v-model="dark"
						label="toggle dark/light theme"
					></v-switch>

					<v-sheet class="border border-radius mx-4 justify-center">
						<v-slide-group
							show-arrows
							v-model="selectedColor"
							class="py-4 justify-space-between"
							center-active
						>
							<v-slide-item
								v-for="(n, key) in colors"
								:key="`color${key}`"
								v-slot:default="{ active, toggle }"
								class="mx-4"
							>
								<v-sheet
									class="d-flex flex-column align-center justify-center"
								>
									<v-btn
										class="mx-2  white--text"
										:input-value="active"
										depressed
										rounded
										@click="toggle"
										:color="n.hash"
										fab
										:width="!$vuetify.breakpoint.xs ? '50px' : '30px'"
										:height="
											!$vuetify.breakpoint.xs ? '50px' : '30px'
										"
										elevation="2"
									>
										<v-scale-transition>
											<v-icon
												v-if="active"
												color="white"
												:size="$vuetify.breakpoint.xs ? '20' : '32'"
												v-text="'mdi-check-circle '"
											></v-icon>
										</v-scale-transition>
									</v-btn>
									<span
										@click="toggle"
										class="link mt-3"
										:class="{ 'body-2': $vuetify.breakpoint.xs }"
										:style="`color:${n.hash}`"
										>{{ n.name }}</span
									>
								</v-sheet>
							</v-slide-item>
						</v-slide-group>
					</v-sheet>
				</v-card-text>

				<v-card-actions class="back justify-space-between py-4">
					<v-btn
						color="red darken-1"
						class="white--text font-weight-medium text-capitalize"
						@click="reset"
						v-bind="btnStyle"
					>
						reset to default
					</v-btn>
					<v-btn
						color="primary"
						class="white--text font-weight-medium text-capitalize "
						@click="done()"
						:loading="loading"
						v-bind="btnStyle"
					>
						done
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-footer>
</template>

<script>
	import { setItem } from '../../helpers/storage';
	import customSelect from '../common/customSelect';
	//const { getCurrentWindow } = require('electron').remote;
	export default {
		data() {
			return {
				dialog: false,
				layout: 'Vertical',
				items: ['Vertical', 'Horizontal'],
				dark: false,
				selectedColor: '',
				loading: false,
				reloadLoading: false,
				colors: [
					{ hash: '#336cfb', name: 'Primary' },
					{ hash: '#3272ab', name: 'dark blue' },
					{ hash: '#f79421', name: 'Orange' },
					{ hash: '#30519e', name: 'Blue' },
					{ hash: '#0fc646', name: 'Green' },
					{ hash: '#e0245e', name: 'pink' },
					{ hash: '#f45d22', name: 'dark orange' },
					{ hash: '#1da1f2', name: 'Twitter' },
					{ hash: '#ffad1f', name: 'Great' },
					{ hash: '#17bf63', name: 'light green' },
					{ hash: '#794bc4', name: 'light Burble' },
					{ hash: '#f7f021', name: 'Yellow' },
					{ hash: '#db27cf', name: 'light Pink' },
					{ hash: '#9500d4', name: 'Burble' }
				],
				shapeItems: ['filled', 'solo', 'outlined', 'soloInverted', 'line']
			};
		},
		components: {
			customSelect
		},
		computed: {
			inputStyle() {
				return this.$store.getters.inputStyle;
			},
			btnStyle() {
				return this.$store.getters.btnStyle;
			},
			inputShape: {
				get() {
					return this.$store.getters.inputShape;
				},
				set(val) {
					return this.$store.commit('inputShape', val);
				}
			},
			btnS: {
				get() {
					return this.$store.getters.btnS;
				},
				set(val) {
					return this.$store.commit('btnStyle', val);
				}
			},
			selectType: {
				get() {
					return this.$store.getters.selectType;
				},
				set(val) {
					return this.$store.commit('selectType', val);
				}
			},
			flat: {
				get() {
					return this.$store.getters.flat;
				},
				set(val) {
					return this.$store.commit('flat', val);
				}
			},
			shaped: {
				get() {
					return this.$store.getters.shaped;
				},
				set(val) {
					return this.$store.commit('shaped', val);
				}
			},
			rounded: {
				get() {
					return this.$store.getters.rounded;
				},
				set(val) {
					return this.$store.commit('rounded', val);
				}
			}
		},
		methods: {
			done() {
				this.loading = true;
				this.dialog = false;
				this.reload();
			},
			reload() {
				this.reloadLoading = true;
				window.location.reload();
				//getCurrentWindow().reload();
			},
			reset() {
				this.changeColor('#336cfb');
				this.dark = false;
				this.layout = 'Vertical';
				this.$store.dispatch('reset');
			},
			changeColor(color) {
				// Light theme
				this.$vuetify.theme.themes.light.primary = color;

				// Dark theme
				this.$vuetify.theme.themes.dark.primary = color;
				setItem('color', color);
			}
		},
		beforeMount() {
			this.dark = this.$vuetify.theme.dark;
			this.selectedColor = this.colors.findIndex(
				e => e.hash == this.$vuetify.theme.themes.light.primary
			);
			this.layout = this.$vuetify.theme.layout || 'Vertical';
		},
		watch: {
			selectedColor(val) {
				const color = this.colors[val];
				if (color) {
					if (color.name === 'More') {
						console.log('open picker');
					} else {
						this.changeColor(color.hash);
					}
				}
			},
			dark(val) {
				this.$vuetify.theme.dark = val;
				setItem('dark', val);
			},
			layout(val) {
				this.$vuetify.theme.layout = val;
				setItem('layout', val);
			}
		}
	};
</script>

<style></style>
