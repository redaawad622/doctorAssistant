<template>
	<div>
		<ul v-if="requests">
			<li
				v-for="req in requests"
				:key="req"
				:style="`font-size:${16 * font}px !important`"
			>
				{{ req.request }}
			</li>
		</ul>
	</div>
</template>

<script>
	import { SESSION_NAMESPACE } from '../../../store/modules/namespaces';
	export default {
		props: {
			font: {
				type: Number,
				default: 1
			}
		},
		name: 'req',
		computed: {
			requests() {
				return this.$store.getters[`${SESSION_NAMESPACE}/requests`];
			}
		}
	};
</script>

<style scoped>
	ul {
		list-style: none;
	}
	ul li {
		padding: 8px 0;
	}
</style>
