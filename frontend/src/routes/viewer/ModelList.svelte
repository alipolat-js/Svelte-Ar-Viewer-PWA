<script lang="ts">
	import { onMount } from 'svelte';

	// TODO: Replace with actual model fetching
	let models = [
		{
			id: 1,
			title: 'Sample Model 1',
			thumbnail: '/models/thumbnails/model1.jpg',
			category: 'furniture'
		},
		{
			id: 2,
			title: 'Sample Model 2',
			thumbnail: '/models/thumbnails/model2.jpg',
			category: 'decoration'
		}
	];

	let isLoading = true;
	let searchQuery = '';
	let selectedCategory = 'all';
	let sortBy = 'newest';

	// Filtered and sorted models
	$: filteredModels = models
		.filter((model) => {
			const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
		.sort((a, b) => {
			if (sortBy === 'newest') return b.id - a.id;
			if (sortBy === 'oldest') return a.id - b.id;
			return 0;
		});

	onMount(async () => {
		// Simulate loading
		await new Promise((resolve) => setTimeout(resolve, 1000));
		isLoading = false;
	});

	const handleModelSelect = (model: any) => {
		// TODO: Implement model selection and AR placement
		console.log('Selected model:', model);
	};
</script>

<div class="space-y-4 text-white">
	<!-- Controls -->
	<div class="flex items-center space-x-4">
		<!-- Search -->
		<div class="flex-1 relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search models..."
				class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			/>
			<div class="absolute left-3 top-2.5 text-gray-400">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
		</div>

		<!-- Category filter -->
		<select
			bind:value={selectedCategory}
			class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
		>
			<option value="all">All</option>
			<option value="furniture">Furniture</option>
			<option value="decoration">Decoration</option>
		</select>

		<!-- Sort -->
		<select
			bind:value={sortBy}
			class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
		>
			<option value="newest">Newest</option>
			<option value="oldest">Oldest</option>
		</select>
	</div>

	<!-- Model list -->
	{#if isLoading}
		<div class="flex items-center justify-center py-8">
			<div class="relative w-10 h-10">
				<div class="absolute inset-0 border-2 border-primary-500/20 rounded-full animate-pulse"></div>
				<div class="absolute inset-2 border-2 border-primary-500/40 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
				<div class="absolute inset-4 border-2 border-primary-500/60 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
			</div>
		</div>
	{:else if filteredModels.length === 0}
		<div class="text-center py-8 text-gray-400">
			No models found
		</div>
	{:else}
		<div
			class="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
			style="scroll-snap-type: x mandatory;"
		>
			{#each filteredModels as model (model.id)}
				<div
					class="flex-none w-48 scroll-snap-align-start"
					on:click={() => handleModelSelect(model)}
					on:keydown={(e) => e.key === 'Enter' && handleModelSelect(model)}
					role="button"
					tabindex="0"
				>
					<div
						class="group bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-primary-500/50 transition-all duration-200 hover:scale-105"
					>
						<!-- Thumbnail -->
						<div class="aspect-w-1 aspect-h-1 bg-white/5 relative">
							{#if model.thumbnail}
								<img
									src={model.thumbnail}
									alt={model.title}
									class="object-cover"
									loading="lazy"
								/>
							{:else}
								<div class="flex items-center justify-center h-full">
									<svg
										class="w-12 h-12 text-gray-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							{/if}
							<!-- Hover overlay -->
							<div class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-200"></div>
						</div>

						<!-- Title -->
						<div class="p-3">
							<h3 class="text-sm font-medium truncate text-white group-hover:text-primary-400 transition-colors duration-200">
								{model.title}
							</h3>
							<p class="text-xs text-gray-400 capitalize mt-0.5">
								{model.category}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Custom scrollbar styles */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* Aspect ratio container */
	.aspect-w-1 {
		position: relative;
		padding-bottom: 100%;
	}
	.aspect-h-1 > * {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	/* Custom select styles */
	select {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
		background-position: right 0.5rem center;
		background-repeat: no-repeat;
		background-size: 1.5em 1.5em;
		padding-right: 2.5rem;
	}
</style> 