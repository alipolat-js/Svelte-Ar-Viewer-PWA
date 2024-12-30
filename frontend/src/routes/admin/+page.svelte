<!-- Admin Dashboard -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ProtectedRoute from '$lib/components/auth/ProtectedRoute.svelte';
	import { ROLES } from '$lib/config';
	import { adminService, type DashboardData } from '$lib/services/admin';

	let loading = true;
	let error: string | null = null;
	let dashboardData: DashboardData | null = null;

	async function loadDashboardData() {
		try {
			loading = true;
			error = null;
			dashboardData = await adminService.getDashboardData();
		} catch (err) {
			console.error('Error loading dashboard data:', err);
			error = 'Failed to load dashboard data';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadDashboardData();
	});
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900">
	<ProtectedRoute roles={[ROLES.ADMIN]}>
		<div class="py-6">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center">
					<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
					<button
						on:click={loadDashboardData}
						class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
					>
						<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						Refresh
					</button>
				</div>
			</div>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				{#if error}
					<div class="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
						<span class="block sm:inline">{error}</span>
					</div>
				{/if}

				{#if loading}
					<div class="mt-8 flex justify-center">
						<svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				{:else if dashboardData}
					<!-- Statistics -->
					<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<!-- Total Users -->
						<div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
							<div class="p-5">
								<div class="flex items-center">
									<div class="flex-shrink-0">
										<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</div>
									<div class="ml-5 w-0 flex-1">
										<dl>
											<dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
											<dd class="flex items-baseline">
												<div class="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.totalUsers}</div>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>

						<!-- Active Models -->
						<div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
							<div class="p-5">
								<div class="flex items-center">
									<div class="flex-shrink-0">
										<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
										</svg>
									</div>
									<div class="ml-5 w-0 flex-1">
										<dl>
											<dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Models</dt>
											<dd class="flex items-baseline">
												<div class="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.activeModels}</div>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>

						<!-- Total Views -->
						<div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
							<div class="p-5">
								<div class="flex items-center">
									<div class="flex-shrink-0">
										<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
									</div>
									<div class="ml-5 w-0 flex-1">
										<dl>
											<dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Views</dt>
											<dd class="flex items-baseline">
												<div class="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.stats.totalViews}</div>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Recent Activity -->
					<div class="mt-8">
						<div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
							<div class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
								<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Activity</h3>
							</div>
							<ul class="divide-y divide-gray-200 dark:divide-gray-700">
								{#each dashboardData.recentActivity as activity}
									<li>
										<div class="px-4 py-4 sm:px-6">
											<div class="flex items-center justify-between">
												<p class="text-sm font-medium text-primary-600 truncate">{activity.message}</p>
												<div class="ml-2 flex-shrink-0 flex">
													<p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
														{activity.timestamp}
													</p>
												</div>
											</div>
											<div class="mt-2 sm:flex sm:justify-between">
												<div class="sm:flex">
													<p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
														{#if activity.type === 'user_registered'}
															{activity.details.userName}
														{:else if activity.type === 'model_uploaded' || activity.type === 'model_viewed'}
															3D Model: "{activity.details.modelName}"
														{/if}
													</p>
												</div>
											</div>
										</div>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</ProtectedRoute>
</div> 