<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let fullWidth: boolean = false;
</script>

<button
  {type}
  {disabled}
  class="relative flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm {fullWidth ? 'w-full' : ''}"
>
  {#if loading}
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="spinner h-5 w-5 border-2"></div>
    </div>
    <span class="opacity-0">
      <slot />
    </span>
  {:else}
    <slot />
  {/if}
</button>

<style>
  .spinner {
    border-color: rgba(255, 255, 255, 0.2);
    border-top-color: white;
    animation: spin 1s linear infinite;
    border-radius: 50%;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style> 