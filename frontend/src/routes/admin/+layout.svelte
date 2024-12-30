<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/ui/Logo.svelte';

	const menuItems = [
		{
			href: '/admin',
			label: 'Dashboard',
			icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3 M12 12l8-4.5M12 12v9M12 12L4 7.5'
		},
		{
			href: '/admin/models',
			label: 'Models',
			icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
		},
		{
			href: '/admin/users',
			label: 'Users',
			icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
		}
	];

	$: getItemClasses = (href: string) => {
		const isActive = $page.url.pathname === href;
		return [
			'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700',
			isActive ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'
		].join(' ');
	};
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900">
	<!-- Sidebar -->
	<nav class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
		<!-- Logo -->
		<div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
			<Logo size="md" />
		</div>

		<!-- Menu Items -->
		<div class="p-4">
			<ul class="space-y-2">
				{#each menuItems as item}
					<li>
						<a href={item.href} class={getItemClasses(item.href)}>
							<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
							</svg>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>

	<!-- Main Content -->
	<div class="ml-64 p-8">
		<slot />
	</div>
</div> 