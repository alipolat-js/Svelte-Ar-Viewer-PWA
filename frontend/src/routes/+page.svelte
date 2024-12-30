<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// TODO: Replace with actual auth check
	const isAuthenticated = false;
	const isAdmin = false;

	onMount(() => {
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
	<div class="spinner h-12 w-12"></div>
</div>
