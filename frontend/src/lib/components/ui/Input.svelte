<script lang="ts">
  export let id: string;
  export let name: string;
  export let type: string = 'text';
  export let label: string;
  export let value: string;
  export let placeholder: string = '';
  export let required: boolean = false;
  export let icon: 'email' | 'password' | undefined = undefined;

  const iconPaths: Record<string, string> = {
    email: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207',
    password: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
  };
</script>

<div class="relative">
  <label for={id} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    {label}
  </label>
  <input
    {id}
    {name}
    {type}
    {required}
    bind:value
    class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-500 dark:focus:ring-primary-500"
    {placeholder}
  />
  {#if icon && iconPaths[icon]}
    <div class="absolute left-3 bottom-3 text-gray-400">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[icon]} />
      </svg>
    </div>
  {/if}
</div> 