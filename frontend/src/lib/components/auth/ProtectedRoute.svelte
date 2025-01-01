<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { authService } from '$lib/services/auth';
  import { ROUTES } from '$lib/constants/app';

  export let roles: string[] = [];
  let isAuthorized = false;

  function checkAuth() {
    if (browser) {
      const isAuthenticated = authService.isAuthenticated();
      const hasRequiredRole = roles.length === 0 || roles.some(role => authService.hasRole(role));
      isAuthorized = isAuthenticated && (roles.length === 0 || hasRequiredRole);

      if (!isAuthenticated || (roles.length > 0 && !hasRequiredRole)) {
        const currentPath = $page.url.pathname;
        const searchParams = $page.url.searchParams.toString();
        const fullPath = searchParams ? `${currentPath}?${searchParams}` : currentPath;
        goto(`${ROUTES.LOGIN}?next=${encodeURIComponent(fullPath)}`);
      }
    }
  }

  onMount(() => {
    checkAuth();
  });

  $: {
    if (browser) {
      checkAuth();
    }
  }
</script>

{#if isAuthorized}
  <slot />
{/if} 