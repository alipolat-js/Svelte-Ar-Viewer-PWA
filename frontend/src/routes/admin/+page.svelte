<script lang="ts">
	const stats = [
		{
			name: 'Total Users',
			value: '2,458',
			change: '+12.5%',
			changeType: 'increase'
		},
		{
			name: 'Active Sessions',
			value: '185',
			change: '+3.2%',
			changeType: 'increase'
		},
		{
			name: 'Models Viewed',
			value: '12,789',
			change: '+15.3%',
			changeType: 'increase'
		},
		{
			name: 'Storage Used',
			value: '2.4 GB',
			change: '-0.5%',
			changeType: 'decrease'
		}
	];

	const recentActivity = [
		{
			user: 'John Doe',
			action: 'viewed',
			target: 'Car Model',
			time: '2 minutes ago'
		},
		{
			user: 'Jane Smith',
			action: 'uploaded',
			target: 'House Model',
			time: '5 minutes ago'
		},
		{
			user: 'Mike Johnson',
			action: 'deleted',
			target: 'Chair Model',
			time: '10 minutes ago'
		}
	];
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
		<button
			type="button"
			class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
		>
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
			Add Model
		</button>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat}
			<div class="relative bg-white dark:bg-gray-800 pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
				<dt>
					<div class="absolute bg-primary-500 rounded-md p-3">
						<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
						</svg>
					</div>
					<p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</p>
				</dt>
				<dd class="ml-16 flex items-baseline">
					<p class="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
					<p
						class="ml-2 flex items-baseline text-sm font-semibold"
						class:text-green-600={stat.changeType === 'increase'}
						class:text-red-600={stat.changeType === 'decrease'}
					>
						{#if stat.changeType === 'increase'}
							<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
						{:else}
							<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
							</svg>
						{/if}
						{stat.change}
					</p>
				</dd>
			</div>
		{/each}
	</div>

	<!-- Recent Activity -->
	<div class="bg-white dark:bg-gray-800 shadow rounded-lg">
		<div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
			<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Activity</h3>
		</div>
		<div class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each recentActivity as activity}
				<div class="px-4 py-4 sm:px-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-primary-600 truncate">{activity.user}</p>
						<div class="ml-2 flex-shrink-0 flex">
							<p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
								{activity.time}
							</p>
						</div>
					</div>
					<div class="mt-2 sm:flex sm:justify-between">
						<div class="sm:flex">
							<p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
								{activity.action} {activity.target}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div> 