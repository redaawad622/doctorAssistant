<template>
	<v-row>
		<v-col
			cols="12"
			sm="6"
			md="4"
			v-for="(file, key) in value"
			:key="`file${key}`"
		>
			<v-card
				class="mx-auto"
				shaped
				max-width="400"
				:class="{ red: file.delete }"
			>
				<v-img
					v-if="isFileImage(file)"
					:src="$sessionPath + file.url"
					class="white--text align-end"
					height="200px"
					@click="openImage(file)"
				>
				</v-img>
				<video
					v-else-if="isFileVideo(file)"
					:src="$sessionPath + file.url"
					controls
					width="100%"
					height="200px"
				></video>
				<v-avatar
					height="200px"
					color="primary lighten-3"
					tile
					width="100%"
					v-else
				>
					<v-icon class="display-4" color="primary">mdi-file</v-icon>
				</v-avatar>
				<v-card-title class="text-no-wrap overflow-x-hidden">{{
					file.orgName || file.url
				}}</v-card-title>
				<v-card-subtitle class="pb-0" v-if="file.type">{{
					file.type
				}}</v-card-subtitle>
				<v-card-actions>
					<v-btn
						text
						:color="file.delete ? 'secondary' : 'error'"
						@click="removeFile(key)"
					>
						{{ file.delete ? 'restore' : 'delete' }}
					</v-btn>

					<v-btn text color="deep-purple accent-4" @click="openImage(file)"
						>open</v-btn
					>
					<v-btn
						text
						color="orange"
						:loading="saveFileLoading == file.url"
						@click="
							download(file.url || 'DA_file', $sessionPath + file.url)
						"
						>save</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import { SESSION_NAMESPACE } from '../../store/modules/namespaces';
	export default {
		props: {
			value: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				saveFileLoading: null
			};
		},
		methods: {
			removeFile(key) {
				let obj = [...this.value];
				obj[key].delete = !obj[key].delete;
				this.$emit('input', obj);
			},

			isFileImage(file) {
				let type =
					file && file['type'] && file['type'].split('/')[0] === 'image';
				return type;
			},
			isFileVideo(file) {
				let type =
					file && file['type'] && file['type'].split('/')[0] === 'video';
				return type;
			},
			openImage(file) {
				const images = this.value.filter(
					img => img.type.split('/')[0] === 'image'
				);
				this.$store.commit(`${SESSION_NAMESPACE}/updateImages`, images);
				this.$store.commit(
					`${SESSION_NAMESPACE}/updatePath`,
					this.$sessionPath
				);
				this.$store.commit(
					`${SESSION_NAMESPACE}/updateCurrentImg`,
					images.indexOf(file)
				);
			},
			download(filename) {
				this.saveFileLoading = filename;
				window
					.axios({
						method: 'get',
						url: 'storage/session/' + filename,
						responseType: 'arraybuffer'
					})
					.then(response => {
						this.saveFileLoading = null;
						this.forceFileDownload(response, filename);
					})
					.catch(() => {
						console.log('error occured');
						this.saveFileLoading = null;
					});
			},
			forceFileDownload(response, filename) {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', filename); //or any other extension
				document.body.appendChild(link);
				link.click();
			}
		}
	};
</script>

<style scoped>
	.fileUpload {
		width: 100%;
		display: flex;
		border: 2px dashed;
		justify-content: center;
		align-items: center;
		height: 100px;
		border-radius: 50px;
		cursor: pointer;
	}
	.fileUpload:hover {
		background-color: unset !important;
	}
</style>
