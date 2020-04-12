<template>
	<v-dialog
		v-model="dialog"
		content-class="elevation-0 pa-0 ma-0 full"
		max-width="100%"
		:overlay-color="color || '#333'"
		:overlay-opacity="$vuetify.breakpoint.xs ? 1 : 0.9"
		:hideOverlay="hideOverlay"
	>
		<v-btn
			ripple
			absolute
			class="mx-2"
			:style="`background:${opacityColor};z-index:1;top:12px;left:6px`"
			icon
			dark
			@click="dialog = false"
		>
			<v-icon>mdi-close</v-icon>
		</v-btn>

		<v-menu bottom left style="z-index:1">
			<template v-slot:activator="{ on }">
				<v-btn
					dark
					icon
					v-on="on"
					right
					absolute
					:style="`background:${opacityColor};z-index:1;top:12px`"
				>
					<v-icon>mdi-dots-horizontal </v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item @click="download(images[current].url)">
					<v-list-item-title>save</v-list-item-title>
				</v-list-item>
				<v-list-item @click="toggleFullscreen()">
					<v-list-item-title>toggle fullscreen</v-list-item-title>
				</v-list-item>
				<v-list-item @click="dialog = false">
					<v-list-item-title>close</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-card color="transparent" class="pa-0 ma-0 " elevation="0">
			<v-carousel
				:continuous="false"
				hide-delimiters
				@change="updateCurrent"
				:value="current"
			>
				<v-carousel-item
					v-for="(slide, i) in images"
					:key="i"
					:src="path + slide.url"
					color="primary"
					contain
				>
					<template v-slot:placeholder>
						<v-row
							class="fill-height ma-0"
							align="center"
							justify="center"
						>
							<v-progress-circular
								indeterminate
								color="grey lighten-5"
							></v-progress-circular>
						</v-row>
					</template>
				</v-carousel-item>
			</v-carousel>
		</v-card>
	</v-dialog>
</template>

<script>
	import { SESSION_NAMESPACE } from '../../store/modules/namespaces';
	export default {
		props: {
			images: {
				type: [Array, Object]
			},
			current: {
				type: Number,
				default: 0
			},
			path: {
				type: String
			},
			color: {
				type: String,
				default: 'rgb(0,0,0)'
			}
		},
		methods: {
			download(filename) {
				window
					.axios({
						method: 'get',
						url: 'storage/session/' + filename,
						responseType: 'arraybuffer'
					})
					.then(response => {
						this.forceFileDownload(response, filename);
					})
					.catch(() => console.log('error occured'));
			},
			forceFileDownload(response, filename) {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', filename); //or any other extension
				document.body.appendChild(link);
				link.click();
			},
			updateCurrent(key) {
				this.$store.commit(`${SESSION_NAMESPACE}/updateCurrentImg`, key);
			},
			openFullscreen() {
				const elem = document.documentElement;

				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.mozRequestFullScreen) {
					/* Firefox */
					elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) {
					/* Chrome, Safari and Opera */
					elem.webkitRequestFullscreen();
				} else if (elem.msRequestFullscreen) {
					/* IE/Edge */
					elem.msRequestFullscreen();
				}
			},
			closeFullscreen() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					/* Firefox */
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					/* Chrome, Safari and Opera */
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					/* IE/Edge */
					document.msExitFullscreen();
				}
			},
			toggleFullscreen() {
				if (!document.fullscreenElement) {
					this.openFullscreen();
				} else {
					this.closeFullscreen();
				}
			}
		},
		data() {
			return {
				dialog: true,
				hideOverlay: false
			};
		},
		computed: {
			opacityColor() {
				return this.$getRgba(this.color, 0.77);
			}
		},
		watch: {
			dialog(val) {
				if (!val) {
					this.$store.commit(`${SESSION_NAMESPACE}/resetImages`, null);
					this.closeFullscreen();
				}
			}
		}
	};
</script>

<style scoped></style>
