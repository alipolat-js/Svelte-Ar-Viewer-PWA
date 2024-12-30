<script lang="ts">
	let users = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			role: 'Admin',
			status: 'Active',
			lastLogin: '2 hours ago'
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'User',
			status: 'Active',
			lastLogin: '5 hours ago'
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike@example.com',
			role: 'User',
			status: 'Inactive',
			lastLogin: '2 days ago'
		}
	];

	let selectedUsers: number[] = [];
	let searchQuery = '';
	let showDeleteModal = false;
	let userToDelete: number | null = null;

	const toggleSelectAll = (event: Event) => {
		const checkbox = event.target as HTMLInputElement;
		if (checkbox.checked) {
			selectedUsers = users.map(user => user.id);
		} else {
			selectedUsers = [];
		}
	};

	const toggleSelectUser = (userId: number) => {
		const index = selectedUsers.indexOf(userId);
		if (index === -1) {
			selectedUsers = [...selectedUsers, userId];
		} else {
			selectedUsers = selectedUsers.filter(id => id !== userId);
		}
	};

	const confirmDelete = (userId: number) => {
		userToDelete = userId;
		showDeleteModal = true;
	};

	const deleteUser = () => {
		if (userToDelete) {
			users = users.filter(user => user.id !== userToDelete);
			selectedUsers = selectedUsers.filter(id => id !== userToDelete);
		}
		showDeleteModal = false;
		userToDelete = null;
	};

	const filteredUsers = () => {
		if (!searchQuery) return users;
		const query = searchQuery.toLowerCase();
		return users.filter(
			user =>
				user.name.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query) ||
				user.role.toLowerCase().includes(query)
		);
	};
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
		<button
			type="button"
			class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
		>
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
			Add User
		</button>
	</div>

	<!-- Search and Filters -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
		<div class="flex-1 max-w-lg">
			<label for="search" class="sr-only">Search</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<input
					type="search"
					bind:value={searchQuery}
					class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
					placeholder="Search users..."
				/>
			</div>
		</div>
		<div class="flex items-center space-x-2">
			<button
				type="button"
				class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
			>
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				Filter
			</button>
			<button
				type="button"
				class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
			>
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				Export
			</button>
		</div>
	</div>

	<!-- Users Table -->
	<div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead class="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
							<input
								type="checkbox"
								class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6"
								on:change={toggleSelectAll}
							/>
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							User
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Role
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Status
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
							Last Login
						</th>
						<th scope="col" class="relative px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
					{#each filteredUsers() as user (user.id)}
						<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
							<td class="relative w-12 px-6 sm:w-16 sm:px-8">
								<input
									type="checkbox"
									class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6"
									checked={selectedUsers.includes(user.id)}
									on:change={() => toggleSelectUser(user.id)}
								/>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div class="h-10 w-10 flex-shrink-0">
										<div class="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
											<span class="text-lg font-medium text-white">{user.name[0]}</span>
										</div>
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
										<div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
									class:bg-primary-100={user.role === 'Admin'}
									class:text-primary-800={user.role === 'Admin'}
									class:dark:bg-primary-900={user.role === 'Admin'}
									class:dark:text-primary-200={user.role === 'Admin'}
									class:bg-gray-100={user.role === 'User'}
									class:text-gray-800={user.role === 'User'}
									class:dark:bg-gray-700={user.role === 'User'}
									class:dark:text-gray-200={user.role === 'User'}
								>
									{user.role}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
									class:bg-green-100={user.status === 'Active'}
									class:text-green-800={user.status === 'Active'}
									class:dark:bg-green-900={user.status === 'Active'}
									class:dark:text-green-200={user.status === 'Active'}
									class:bg-red-100={user.status === 'Inactive'}
									class:text-red-800={user.status === 'Inactive'}
									class:dark:bg-red-900={user.status === 'Inactive'}
									class:dark:text-red-200={user.status === 'Inactive'}
								>
									{user.status}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.lastLogin}</td>
							<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button
									type="button"
									class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
								>
									Edit
								</button>
								<button
									type="button"
									class="ml-3 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
									on:click={() => confirmDelete(user.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
	<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div class="sm:flex sm:items-start">
					<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
						<svg class="h-6 w-6 text-red-600 dark:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
							Delete User
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500 dark:text-gray-400">
								Are you sure you want to delete this user? This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={deleteUser}
					>
						Delete
					</button>
					<button
						type="button"
						class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
						on:click={() => (showDeleteModal = false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if} 