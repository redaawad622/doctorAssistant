<template>
	<div>
		<v-subheader class="px-0 mx-0" v-if="label && selectType === 'chip'">{{
			label
		}}</v-subheader>
		<v-chip-group
			v-if="selectType === 'chip'"
			center-active
			:value="value"
			@change="changeItem"
			active-class="primary"
			:column="!$vuetify.breakpoint.xs"
		>
			<v-chip filter v-for="item in items" :key="item" :value="item">{{
				item
			}}</v-chip>
		</v-chip-group>
		<v-autocomplete
			v-else-if="selectType === 'autocomplete'"
			:items="items"
			:value="value"
			@change="changeItem"
			allow-overflow
			v-bind="inputStyle"
			:label="label"
		></v-autocomplete>
		<v-select
			v-else
			:items="items"
			:value="value"
			@change="changeItem"
			allow-overflow
			v-bind="inputStyle"
			:label="label"
		></v-select>
	</div>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default: () => []
			},
			value: {
				type: [Number, String],
				default: ''
			},
			type: {
				type: String,
				default: null
			},
			label: {
				type: String,
				default: ''
			}
		},
		computed: {
			selectType() {
				let type = this.type;
				if (!type) {
					type = this.$store.getters.selectType;
				}
				return type;
			},
			inputStyle() {
				return this.$store.getters.inputStyle;
			}
		},
		methods: {
			changeItem(val) {
				this.$emit('input', val);
			}
		}
	};
</script>

<style></style>
