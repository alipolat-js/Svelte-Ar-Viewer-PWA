<script lang="ts">
	let models = [
		{
			id: 1,
			name: 'Car Model',
			thumbnail: '/models/car.png',
			fileSize: '2.5 MB',
			format: 'GLTF',
			uploadedBy: 'John Doe',
			uploadedAt: '2 hours ago',
			views: 245
		},
		{
			id: 2,
			name: 'House Model',
			thumbnail: '/models/house.png',
			fileSize: '4.8 MB',
			format: 'GLTF',
			uploadedBy: 'Jane Smith',
			uploadedAt: '5 hours ago',
			views: 189
		},
		{
			id: 3,
			name: 'Chair Model',
			thumbnail: '/models/chair.png',
			fileSize: '1.2 MB',
			format: 'GLTF',
			uploadedBy: 'Mike Johnson',
			uploadedAt: '1 day ago',
			views: 156
		}
	];

	let searchQuery = '';
	let showUploadModal = false;
	let showDeleteModal = false;
	let modelToDelete: number | null = null;
	let uploadProgress = 0;
	let isUploading = false;

	const filteredModels = () => {
		if (!searchQuery) return models;
		const query = searchQuery.toLowerCase();
		return models.filter(
			model =>
				model.name.toLowerCase().includes(query) ||
				model.uploadedBy.toLowerCase().includes(query) ||
				model.format.toLowerCase().includes(query)
		);
	};

	const confirmDelete = (modelId: number) => {
		modelToDelete = modelId;
		showDeleteModal = true;
	};

	const deleteModel = () => {
		if (modelToDelete) {
			models = models.filter(model => model.id !== modelToDelete);
		}
		showDeleteModal = false;
		modelToDelete = null;
	};

	const simulateUpload = () => {
		isUploading = true;
		uploadProgress = 0;
		const interval = setInterval(() => {
			uploadProgress += 10;
			if (uploadProgress >= 100) {
				clearInterval(interval);
				isUploading = false;
				showUploadModal = false;
				uploadProgress = 0;
			}
		}, 500);
	};
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">3D Models</h1>
		<button
			type="button"
			class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
			on:click={() => (showUploadModal = true)}
		>
			<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
			Upload Model
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
					placeholder="Search models..."
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

	<!-- Models Grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredModels() as model (model.id)}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
				<div class="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
					<img src={model.thumbnail} alt={model.name} class="object-cover" />
				</div>
				<div class="p-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-medium text-gray-900 dark:text-white">{model.name}</h3>
						<div class="flex items-center space-x-2">
							<button
								type="button"
								aria-label="Edit model"
								class="p-1 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
							</button>
							<button
								type="button"
								aria-label="Delete model"
								class="p-1 rounded-lg text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
								on:click={() => confirmDelete(model.id)}
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</div>
					</div>
					<div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
						<div class="flex items-center space-x-1">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
							<span>{model.views} views</span>
						</div>
					</div>
					<div class="mt-4 flex items-center justify-between text-sm">
						<div class="text-gray-500 dark:text-gray-400">
							{model.fileSize} • {model.format}
						</div>
						<div class="text-gray-500 dark:text-gray-400">
							{model.uploadedAt}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Upload Modal -->
{#if showUploadModal}
	<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div>
					<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900">
						<svg class="h-6 w-6 text-primary-600 dark:text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
							Upload 3D Model
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500 dark:text-gray-400">
								Drag and drop your 3D model file here, or click to select a file. Supported formats: GLTF, GLB, OBJ
							</p>
						</div>
					</div>
				</div>

				{#if isUploading}
					<div class="mt-5">
						<div class="relative pt-1">
							<div class="flex mb-2 items-center justify-between">
								<div>
									<span class="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
										Uploading...
									</span>
								</div>
								<div class="text-right">
									<span class="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
										{uploadProgress}%
									</span>
								</div>
							</div>
							<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200 dark:bg-primary-900">
								<div
									style="width: {uploadProgress}%"
									class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
								></div>
							</div>
						</div>
					</div>
				{:else}
					<div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
						<button
							type="button"
							class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
							on:click={simulateUpload}
						>
							Upload
						</button>
						<button
							type="button"
							class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
							on:click={() => (showUploadModal = false)}
						>
							Cancel
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

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
							Delete Model
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500 dark:text-gray-400">
								Are you sure you want to delete this model? This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={deleteModel}
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