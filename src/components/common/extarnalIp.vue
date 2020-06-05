<template>
	<v-dialog :value="value" @input="$emit('input', false)" max-width="500px">
		<v-card flat>
			<v-card-title class="headline">Change host configrations</v-card-title>
			<v-card-text>
				<v-form lazy-validation ref="form">
					<v-text-field
						placeholder="http://example.com"
						v-model="ip"
						:rules="rules"
						v-bind="inputStyle"
					></v-text-field>
					<v-subheader>example of a valid url or ip</v-subheader>
					<v-list-item-content>http://example.com</v-list-item-content>
					<v-list-item-content>https://example.com</v-list-item-content>
					<v-list-item-content>http://www.example.com</v-list-item-content>
					<v-list-item-content
						>https://www.example.com</v-list-item-content
					>
					<v-list-item-content>http://192.168.1.10</v-list-item-content>
				</v-form>
			</v-card-text>

			<v-card-actions class="back justify-space-between py-4">
				<v-btn
					color="red darken-1"
					class="white--text font-weight-medium text-capitalize elevation-5"
					@click="reset"
				>
					reset default
				</v-btn>
				<v-btn
					color="primary"
					class="white--text font-weight-medium text-capitalize elevation-5"
					@click="done()"
					:loading="loading"
				>
					change
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import { setItem } from '../../helpers/storage';
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			inputStyle() {
				return this.$store.getters.inputStyle;
			}
		},
		methods: {
			reset() {
				setItem('url', 'http://localhost');
				window.location.reload();
			},
			done() {
				if (this.$refs.form.validate()) {
					this.loading = true;
					setItem('url', this.ip);
					window.location.reload();
				}
			}
		},
		data() {
			return {
				loading: false,
				ip: '',
				rules: [
					v => !!v || 'faild is required',
					v =>
						/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/.test(
							v
						) || 'invalid host please write valid url or ip'
				]
			};
		}
	};
</script>

<style></style>
