<!-- User Management Page -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ProtectedRoute from '$lib/components/auth/ProtectedRoute.svelte';
	import { ROLES } from '$lib/config';
	import { authService } from '$lib/services/auth';
	import type { UserProfileResponse } from '$lib/types';
	import CreateUserForm from '$lib/components/admin/CreateUserForm.svelte';
	import EditUserForm from '$lib/components/admin/EditUserForm.svelte';

	let loading = true;
	let error: string | null = null;
	let users: UserProfileResponse[] = [];
	let showCreateUserForm = false;
	let showEditUserForm = false;
	let selectedUser: UserProfileResponse | null = null;

	async function loadUsers() {
		try {
			loading = true;
			error = null;
			users = await authService.getUsers();
		} catch (err) {
			console.error('Error loading users:', err);
			error = 'Failed to load users';
		} finally {
			loading = false;
		}
	}

	async function toggleUserStatus(userId: string, isActive: boolean) {
		try {
			if (isActive) {
				await authService.deactivateUser(userId);
			} else {
				await authService.reactivateUser(userId);
			}
			await loadUsers();
		} catch (err) {
			console.error('Error toggling user status:', err);
			error = 'Failed to update user status';
		}
	}

	async function handleUserCreated() {
		showCreateUserForm = false;
		await loadUsers();
	}

	async function handleUserUpdated() {
		showEditUserForm = false;
		selectedUser = null;
		await loadUsers();
	}

	async function handleEditUser(user: UserProfileResponse) {
		selectedUser = user;
		showEditUserForm = true;
	}

	async function handleDeleteUser(userId: string) {
		if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
			try {
				await authService.deleteUser(userId);
				await loadUsers();
			} catch (err) {
				console.error('Error deleting user:', err);
				error = 'Failed to delete user';
			}
		}
	}

	onMount(() => {
		loadUsers();
	});
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900">
	<ProtectedRoute roles={[ROLES.ADMIN]}>
		<div class="py-6">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center mb-6">
					<h1 class="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
					<button
						on:click={() => showCreateUserForm = true}
						class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#38BDF8] hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8]"
					>
						Create User
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
						<svg class="animate-spin h-8 w-8 text-[#38BDF8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				{:else}
					<div class="mt-8 flex flex-col">
						<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
									<table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
										<thead class="bg-gray-50 dark:bg-gray-800">
											<tr>
												<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Name</th>
												<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
												<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Roles</th>
												<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
												<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Created At</th>
												<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Login</th>
												<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
													<span class="sr-only">Actions</span>
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
											{#each users as user}
												<tr>
													<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
														<div class="flex items-center">
															<div class="h-10 w-10 flex-shrink-0">
																<span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white">
																	{user.firstName?.[0]?.toUpperCase() ?? ''}{user.lastName?.[0]?.toUpperCase() ?? ''}
																</span>
															</div>
															<div class="ml-4">
																<div class="font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</div>
																<div class="text-gray-500 dark:text-gray-400">{user.userName}</div>
															</div>
														</div>
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
														<div class="flex gap-1">
															{#each user.roles as role}
																<span class="inline-flex items-center rounded-full bg-[#E2F5EA] px-2.5 py-0.5 text-xs font-medium text-[#14532D]">
																	{role}
																</span>
															{/each}
														</div>
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
														<span class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.isActive ? 'bg-[#E2F5EA] text-[#14532D]' : 'bg-red-100 text-red-800'}`}>
															{user.isActive ? 'Active' : 'Inactive'}
														</span>
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
														{new Date(user.createdAt).toLocaleDateString()}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
														{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
													</td>
													<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
														<div class="flex gap-4 justify-end">
															<button
																on:click={() => handleEditUser(user)}
																class="text-[#38BDF8] hover:text-[#0EA5E9]"
															>
																Edit
															</button>
															<button
																on:click={() => toggleUserStatus(user.id, user.isActive)}
																class="text-[#38BDF8] hover:text-[#0EA5E9]"
															>
																{user.isActive ? 'Deactivate' : 'Activate'}
															</button>
															<button
																on:click={() => handleDeleteUser(user.id)}
																class="text-red-600 hover:text-red-700"
															>
																Delete
															</button>
														</div>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</ProtectedRoute>

	{#if showCreateUserForm}
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Create New User</h2>
					<button
						on:click={() => showCreateUserForm = false}
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<CreateUserForm on:userCreated={handleUserCreated} />
			</div>
		</div>
	{/if}

	{#if showEditUserForm && selectedUser}
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
			<div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Edit User</h2>
					<button
						on:click={() => { showEditUserForm = false; selectedUser = null; }}
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<EditUserForm user={selectedUser} on:userUpdated={handleUserUpdated} />
			</div>
		</div>
	{/if}
</div> 