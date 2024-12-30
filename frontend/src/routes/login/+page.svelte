<!-- Login Page -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authService } from '$lib/services/auth';
  import { ROUTES } from '$lib/config';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    loading = true;
    error = '';

    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const nextUrl = $page.url.searchParams.get('next') || ROUTES.admin;
        goto(nextUrl);
      } else {
        error = response.message || 'Login failed';
      }
    } catch (err) {
      console.error('Login error:', err);
      error = 'An error occurred during login';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex">
  <!-- Left side - Hero section -->
  <div class="hidden lg:flex w-1/2 bg-primary-900 text-white p-12 items-center justify-center">
    <div class="max-w-md">
      <h1 class="text-4xl font-bold mb-6">Welcome to AR Viewer</h1>
      <p class="text-lg mb-8">Experience augmented reality like never before. Sign in to access your personalized AR content.</p>
      <!-- Add your hero image or animation here -->
    </div>
  </div>

  <!-- Right side - Login form -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">Sign In</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to access your account</p>
      </div>

      <form on:submit|preventDefault={handleLogin} class="space-y-6">
        {#if error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <span class="block sm:inline">{error}</span>
          </div>
        {/if}

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {#if loading}
            <span class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          {:else}
            Sign in
          {/if}
        </button>
      </form>
    </div>
  </div>
</div> 