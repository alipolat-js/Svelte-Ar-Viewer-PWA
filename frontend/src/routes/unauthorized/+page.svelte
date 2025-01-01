<script lang="ts">
  import { goto } from '$app/navigation';
  import { ROUTES } from '$lib/config';
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">401</h1>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Unauthorized Access
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        You don't have permission to access this page.
      </p>
      <div class="flex justify-center space-x-4">
        <button
          on:click={() => goto(ROUTES.home)}
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm 
                 text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          Go Home
        </button>
        <button
          on:click={() => goto(ROUTES.login)}
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md 
                 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</div> 