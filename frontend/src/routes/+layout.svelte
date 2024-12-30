<!-- Base layout component -->
<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Logo from '$lib/components/ui/Logo.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	$: isAuthPage = $page.url.pathname.startsWith('/auth');
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
	{#if !isAuthPage}
		<header class="fixed top-0 left-0 right-0 z-50">
			<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="flex justify-between h-16">
						<!-- Logo Section -->
						<div class="flex items-center">
							<Logo size="sm" />
						</div>

						<!-- Right Section -->
						<div class="flex items-center space-x-4">
							<!-- Theme Toggle -->
							<ThemeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	{/if}

	<main class={!isAuthPage ? 'pt-16' : ''}>
		<slot />
	</main>
</div>

<style lang="postcss">
	:global(html) {
		@apply antialiased;
	}
</style> 