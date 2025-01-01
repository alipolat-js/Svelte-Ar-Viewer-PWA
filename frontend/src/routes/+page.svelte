<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AUTH_CONFIG } from '$lib/config';

	let isAuthenticated = false;
	let isAdmin = false;

	onMount(() => {
		const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
		const user = localStorage.getItem(AUTH_CONFIG.userKey);
		
		if (token && user) {
			try {
				const userData = JSON.parse(user);
				isAuthenticated = true;
				isAdmin = userData.roles?.includes('Admin') || false;
			} catch (err) {
				console.error('Error parsing user data:', err);
			}
		}

		if (!isAuthenticated) {
			goto('/auth/login');
		} else if (isAdmin) {
			goto('/admin');
		} else {
			goto('/viewer');
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="spinner h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
</div>
