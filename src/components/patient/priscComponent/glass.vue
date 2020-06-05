<template>
	<v-simple-table>
		<thead :style="`background-color:${borderColor}!important`">
			<tr :style="`background-color:${borderColor}!important`">
				<th>#</th>
				<th>Right Eye</th>
				<th>Left Eye</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>UC_BC_VA</td>
				<td>
					<v-row>
						<v-col cols="6">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>UCVA</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
								>
									{{ glass.r_UCVA }}</span
								>
							</div>
						</v-col>
						<v-col cols="6">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>BCVA</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
								>
									{{ glass.r_BCVA }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
				<td>
					<v-row>
						<v-col cols="6">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>UCVA</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_UCVA }}</span
								>
							</div>
						</v-col>
						<v-col cols="6">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>BCVA</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_BCVA }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
			</tr>
			<tr>
				<td>Dist.</td>
				<td>
					<v-row>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Sph</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.r_sph }}</span
								>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Cyl</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.r_cyl }}</span
								>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Axis</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.r_axis }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
				<td>
					<v-row>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Sph</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_sph }}</span
								>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Cyl</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_cyl }}</span
								>
							</div>
						</v-col>
						<v-col cols="4">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Axis</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_axis }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
			</tr>
			<tr>
				<td>Near</td>
				<td>
					<v-row>
						<v-col cols="12">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Add</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.r_add }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
				<td>
					<v-row>
						<v-col cols="12">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Add</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.l_add }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
			</tr>
			<tr>
				<td>IPD</td>
				<td colspan="2">
					<v-row>
						<v-col cols="12">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Ipd</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.ipd }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
			</tr>
			<tr>
				<td>Notes</td>
				<td colspan="2">
					<v-row>
						<v-col cols="12">
							<div class="data">
								<span
									class="name"
									:style="`font-size:${11 * font}px !important`"
									>Notes</span
								>
								<span
									class="value"
									:style="`font-size:${14 * font}px !important`"
									>{{ glass.notes }}</span
								>
							</div>
						</v-col>
					</v-row>
				</td>
			</tr>
		</tbody>
	</v-simple-table>
</template>

<script>
	import { SESSION_NAMESPACE } from '../../../store/modules/namespaces';
	export default {
		name: 'req',
		props: {
			font: {
				type: Number,
				default: 1
			},
			borderColor: {
				type: String,
				default: ''
			}
		},
		computed: {
			glass() {
				return this.$store.getters[`${SESSION_NAMESPACE}/glass`];
			}
		}
	};
</script>

<style lang="scss" scoped>
	.data {
		display: flex;
		flex-direction: column;
		.value {
			font-weight: bold;
		}
	}
	ul {
		list-style: none;
	}
	ul li {
		padding: 8px 0;
	}
	table tr .col {
		padding: 4px;
	}
</style>
