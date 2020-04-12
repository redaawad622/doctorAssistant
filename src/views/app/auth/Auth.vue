<template>
	<v-card
		:img="!$vuetify.breakpoint.xs && `${$imgPath}/auth.jpg`"
		class="all-height"
		color="grey"
		width="100%"
		flat
	>
		<v-card-text
			class="authForm px-7"
			:class="!$vuetify.breakpoint.xs && 'max-width-400 px-10'"
		>
			<v-list-item two-line style="flex:0" class="px-0">
				<v-list-item-avatar>
					<v-img :src="`${$imgPath}/logo.svg`"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>Doctore Assistance</v-list-item-title>
					<v-list-item-subtitle>App</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<router-view></router-view>
		</v-card-text>
	</v-card>
</template>

<script>
	import { AUTH_NAMESPACE } from '../../../store/modules/namespaces';
	export default {
		computed: {
			currentUser() {
				return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
			}
		},
		created() {
			this.currentUser ? this.$router.push('/') : null;
		}
	};
</script>

<style lang="scss" scoped>
	.all-height {
		height: 100vh;
	}
	.authForm {
		background: #fff;
		height: 100%;
		overflow: auto;
		box-shadow: 0 18px 24px rgba(0, 0, 0, 0.12);
		display: -webkit-box;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}
	.max-width-400 {
		max-width: 400px;
	}
</style>
