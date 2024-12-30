<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	let isARSupported = false;
	let isLoading = true;
	let showModelList = false;
	let models = [
		{ id: 1, name: 'Cube', thumbnail: '/models/cube.png' },
		{ id: 2, name: 'Sphere', thumbnail: '/models/sphere.png' },
		{ id: 3, name: 'Cylinder', thumbnail: '/models/cylinder.png' }
	];

	onMount(async () => {
		// Check if WebXR is supported
		isARSupported = 'xr' in navigator && await (navigator as any).xr?.isSessionSupported('immersive-ar');
		isLoading = false;
	});

	const toggleModelList = () => {
		showModelList = !showModelList;
	};

	const resetView = () => {
		// Reset camera position and rotation
		console.log('Resetting view');
	};
</script>

<div class="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
	<!-- Background Pattern -->
	<div class="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

	{#if isLoading}
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="spinner h-12 w-12 border-4 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400"></div>
		</div>
	{:else if !isARSupported}
		<div class="absolute inset-0 flex items-center justify-center p-4">
			<div class="max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
					<svg class="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-red-500 dark:text-red-400 mb-2">AR Not Supported</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Your device or browser doesn't support WebXR. Please try using a compatible device and browser to experience AR.
				</p>
			</div>
		</div>
	{:else}
		<!-- AR Canvas Container -->
		<div class="absolute inset-0">
			<!-- AR canvas will be mounted here -->
		</div>

		<!-- Controls Overlay -->
		<div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
			<!-- Reset View Button -->
			<button
				on:click={resetView}
				aria-label="Reset view"
				class="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-lg"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
			</button>

			<!-- Toggle Model List Button -->
			<button
				on:click={toggleModelList}
				aria-label={showModelList ? "Hide model list" : "Show model list"}
				class="p-4 rounded-full bg-primary-500 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
			>
				<svg class="w-8 h-8 transition-transform duration-200" class:rotate-45={showModelList} fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>

		<!-- Model List -->
		{#if showModelList}
			<div
				class="absolute bottom-28 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-4 transform transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700"
				class:translate-y-0={showModelList}
				class:translate-y-full={!showModelList}
			>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">3D Models</h3>
					<div class="flex items-center space-x-2">
						<button 
							class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
							aria-label="Filter models"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
						</button>
						<button 
							class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
							aria-label="Search models"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
					</div>
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-60 overflow-y-auto">
					{#each models as model (model.id)}
						<button class="group relative aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200">
							<img
								src={model.thumbnail}
								alt={model.name}
								class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<div class="absolute bottom-2 left-2 right-2">
									<p class="text-sm text-white font-medium truncate">{model.name}</p>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.bg-grid-pattern {
		background-image: linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	:global(.dark) .bg-grid-pattern {
		background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}
</style> 