<script lang="ts">
  import { onMount, beforeUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { authService } from '$lib/services/auth';
  import { ROUTES } from '$lib/config';

  export let roles: string[] = [];

  function checkAuth() {
    if (browser) {
      const isAuthenticated = authService.isAuthenticated();
      const hasRequiredRole = roles.length === 0 || roles.some(role => authService.hasRole(role));

      if (!isAuthenticated || (roles.length > 0 && !hasRequiredRole)) {
        const currentPath = $page.url.pathname;
        goto(`${ROUTES.login}?next=${encodeURIComponent(currentPath)}`);
      }
    }
  }

  beforeUpdate(() => {
    checkAuth();
  });

  onMount(() => {
    checkAuth();
  });
</script>

{#if browser && authService.isAuthenticated() && (roles.length === 0 || roles.some(role => authService.hasRole(role)))}
  <slot />
{/if} 