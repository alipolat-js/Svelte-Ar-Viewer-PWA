<!-- Edit User Form -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { authService } from '$lib/services/auth';
	import { ROLES } from '$lib/config';
	import type { UserProfileResponse } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let user: UserProfileResponse;

	let firstName = user.firstName;
	let lastName = user.lastName;
	let email = user.email;
	let roles = {
		ADMIN: user.roles.includes(ROLES.ADMIN),
		USER: user.roles.includes(ROLES.USER),
		VIEWER: user.roles.includes(ROLES.VIEWER)
	};

	let error: string | null = null;
	let loading = false;

	async function handleSubmit() {
		try {
			loading = true;
			error = null;

			const selectedRoles = Object.entries(roles)
				.filter(([_, isSelected]) => isSelected)
				.map(([role]) => ROLES[role as keyof typeof ROLES]);

			if (selectedRoles.length === 0) {
				error = 'Please select at least one role';
				return;
			}

			const updateData = {
				firstName,
				lastName,
				email,
				roles: selectedRoles
			};

			await authService.updateUser(user.id, updateData);
			dispatch('userUpdated');
		} catch (err) {
			console.error('Error updating user:', err);
			error = err instanceof Error ? err.message : 'Failed to update user';
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	{#if error}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
			<span class="block sm:inline">{error}</span>
		</div>
	{/if}

	<div class="grid grid-cols-2 gap-4">
		<Input
			id="firstName"
			name="firstName"
			type="text"
			label="First Name"
			bind:value={firstName}
			placeholder="Enter first name"
			required
		/>

		<Input
			id="lastName"
			name="lastName"
			type="text"
			label="Last Name"
			bind:value={lastName}
			placeholder="Enter last name"
			required
		/>
	</div>

	<Input
		id="email"
		name="email"
		type="email"
		label="Email"
		bind:value={email}
		placeholder="Enter email address"
		required
		icon="email"
	/>

	<div class="space-y-2">
		<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
			Roles
		</label>
		<div class="flex gap-4">
			{#each Object.entries(roles) as [role, isSelected]}
				<label class="inline-flex items-center">
					<input
						type="checkbox"
						bind:checked={roles[role as keyof typeof roles]}
						class="rounded border-gray-300 text-[#38BDF8] focus:ring-[#38BDF8] dark:border-gray-700 dark:bg-gray-900"
					/>
					<span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{role}</span>
				</label>
			{/each}
		</div>
	</div>

	<div class="flex justify-end">
		<button
			type="submit"
			disabled={loading}
			class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#38BDF8] hover:bg-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{#if loading}
				<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			{/if}
			Update User
		</button>
	</div>
</form> 