<template>
	<v-card
		:img="!$vuetify.breakpoint.xs ? `${$imgPath}/auth.jpg` : ''"
		class="all-height"
		color="grey"
		width="100%"
		flat
	>
		<v-card-text
			class="authForm px-10"
			:class="!$vuetify.breakpoint.xs && 'max-width-400'"
		>
			<v-list-item two-line style="flex:0" class="px-0">
				<v-list-item-avatar>
					<v-img :src="`${$imgPath}/logo.svg`"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>Doctor Assistant</v-list-item-title>
					<v-list-item-subtitle>App</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<router-view></router-view>
			<!--<extarnal-ip v-model="open"></extarnal-ip>-->
			<!-- <v-btn text color="primary" @click="open = true">change host</v-btn> -->
		</v-card-text>
	</v-card>
</template>

<script>
	import { AUTH_NAMESPACE } from '../../../store/modules/namespaces';
	//import extarnalIp from '../../../components/common/extarnalIp';
	export default {
		components: {
			//extarnalIp
		},
		computed: {
			currentUser() {
				return this.$store.getters[`${AUTH_NAMESPACE}/currentUser`];
			}
		},
		data() {
			return {
				open: false
			};
		},
		created() {
			this.currentUser ? this.$router.replace('/') : null;
		}
	};
</script>

<style lang="scss" scoped>
	.all-height {
		height: 100vh;
		overflow: hidden;
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
