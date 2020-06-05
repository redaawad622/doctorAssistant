<template>
	<v-container class="px-8">
		<v-text-field
			v-model="task"
			label="What are you working on?"
			solo
			@keydown.enter="create"
		>
			<v-fade-transition v-slot:append>
				<v-icon v-if="task" @click="create">
					add_circle
				</v-icon>
			</v-fade-transition>
		</v-text-field>
		<div class="d-flex">
			<h2 class="display-1 success--text ">
				Tasks:&nbsp;
				<v-fade-transition leave-absolute>
					<span :key="`tasks-${tasks.length}`">
						{{ tasks.length }}
					</span>
				</v-fade-transition>
			</h2>
			<v-spacer></v-spacer>
			<v-menu bottom left>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item @click="deleteTask()">
						<v-list-item-title>delete completed tasks</v-list-item-title>
					</v-list-item>
					<v-list-item @click="deleteTask(true)">
						<v-list-item-title>delete all tasks</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>

		<v-divider class="mt-4"></v-divider>

		<v-row class="my-1" align="center">
			<strong class="mx-4 info--text text--darken-2">
				Remaining: {{ remainingTasks }}
			</strong>

			<v-divider vertical></v-divider>

			<strong class="mx-4 success--text text--darken-2">
				Completed: {{ completedTasks }}
			</strong>

			<v-spacer></v-spacer>

			<v-progress-circular
				:value="progress"
				class="mr-2"
			></v-progress-circular>
		</v-row>

		<v-divider class="mb-4"></v-divider>

		<v-card v-if="tasks.length > 0">
			<v-slide-y-transition class="py-0" group tag="v-list">
				<template v-for="(task, i) in tasks">
					<v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

					<v-list-item :key="`${i}-${task.text}`">
						<v-list-item-action>
							<v-checkbox
								v-model="task.done"
								:color="(task.done && 'grey') || 'primary'"
							>
								<template v-slot:label>
									<div
										:class="
											(task.done && 'grey--text') || 'black--text'
										"
										class="ml-4 subtitle-2"
										v-text="task.text"
									></div>
								</template>
							</v-checkbox>
						</v-list-item-action>

						<v-spacer></v-spacer>
						<time
							class="px-2 subtitle-2"
							:class="(task.done && 'grey--text') || 'primary--text'"
							>{{ task.date }}</time
						>
						<v-scroll-x-transition>
							<v-icon v-if="task.done" color="success">
								mdi-check
							</v-icon>
						</v-scroll-x-transition>
					</v-list-item>
				</template>
			</v-slide-y-transition>
		</v-card>
	</v-container>
</template>

<script>
	import { setItem, getItem } from '../../../helpers/storage';
	export default {
		data: () => ({
			tasks: [],
			task: null
		}),

		computed: {
			completedTasks() {
				return this.tasks.filter(task => task.done).length;
			},
			progress() {
				return (this.completedTasks / this.tasks.length) * 100;
			},
			remainingTasks() {
				return this.tasks.length - this.completedTasks;
			}
		},

		methods: {
			create() {
				this.tasks.push({
					done: false,
					text: this.task,
					date: new Date().toDateString()
				});

				this.task = null;
			},
			deleteTask(isAll) {
				if (isAll) {
					this.tasks = [];
				} else {
					this.tasks = this.tasks.filter(task => !task.done);
				}
			}
		},
		created() {
			const tasks = getItem('tasks');
			this.tasks = tasks || [];
		},
		watch: {
			tasks: {
				handler() {
					setItem('tasks', this.tasks);
				},
				deep: true
			}
		}
	};
</script>
