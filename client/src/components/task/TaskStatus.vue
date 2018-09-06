<template>
	<div class="task-status-bar" :tasks="tasks" :user="user">
		<div class="assignee">
			<div class="assignee-to">
				<span>Assignees <i class="material-icons">settings</i></span>
			</div>
			<div class="assignee-tooltip">
				<div class="assignee-tooltip--content">
					<div>
						<div class="form-group">
							<input
								type="text"
								id="taskTitle"
								name="taskTitle"
								ref="taskTitle"
								v-model="searchUser"
								:autofocus="true" required="required"/>
							<label for="folder" class="control-label">Filter people</label><i class="bar"></i>
						</div>
					</div>
					<div class="assignee-tooltip--people">
						<div class="assignee-tooltip--item">

						</div>
						<!-- <div
							v-for="user in filteredUsers"
							:key="user.id"
							class="assignee-tooltip--item">
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CTaskStatus',
	props: {
		tasks: {
			type: Array,
			default(){
				return []
			}
		},
		user: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
    return {
			formaterDate: '',
			searchUser: '',
			taskStatus: ['New', 'In Progress', 'Completed', 'On Hold', 'Under Review' 'Cancelled'],
			bgStatus: '',
			bgLabels: {
				New: 'rgb(227, 242, 253)',
        Completed: '#f1f8e9',
        Cancelled: '#fafafa',
        'In Progress': '#e0f7fa',
        'On Hold': '#fafafa',
				'Under Review': '#fafafa'
			}
		}
	}
}
</script>

<style lang="scss" scope>
@import "../../assets/scss/components/buttons/button";
@import "../../assets/scss/components/form/form";

	.assignee {
		position: relative;
	}

	.assignee-tooltip {
		position: absolute;
		padding: 0.1rem 1.5rem;
		width: 26rem;
		min-height: 20rem;
		right:0;
		top:1.5rem;
	}

	.assignee-to {
		span{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size:1.5rem;
			padding: 1.5rem;
			cursor: pointer;
		}

		i {
			margin-left: 0.5rem;
		}
	}
</style>
