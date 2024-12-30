<script lang="ts">
  import { APP_NAME, APP_DESCRIPTION } from '$lib/constants/app';
  
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizes = {
    sm: {
      container: 'w-10 h-10',
      icon: 'w-6 h-6',
      text: 'text-xl'
    },
    md: {
      container: 'w-12 h-12',
      icon: 'w-8 h-8',
      text: 'text-2xl'
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'w-10 h-10',
      text: 'text-4xl'
    }
  };
</script>

<div class="flex items-center space-x-4">
  <div class="relative">
    <div class="{sizes[size].container} rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center transform transition-all duration-300">
      <svg class="{sizes[size].icon} text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </svg>
    </div>
    <!-- Decorative elements -->
    <div class="absolute -top-1 -right-1 w-4 h-4 bg-primary-300 rounded-full animate-pulse"></div>
    <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-200 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
  </div>
  <div class="flex flex-col">
    <span class="{sizes[size].text} font-bold text-gray-900 dark:text-white">
      {APP_NAME}
    </span>
    <span class="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider">
      {APP_DESCRIPTION}
    </span>
  </div>
</div> 