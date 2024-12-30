<script lang="ts">
	import { goto } from '$app/navigation';
	import { APP_TAGLINE, ROUTES } from '$lib/constants/app';
	import Logo from '$lib/components/ui/Logo.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let email = '';
	let password = '';
	let rememberMe = false;
	let isLoading = false;
	let error = '';

	const handleSubmit = async () => {
		try {
			isLoading = true;
			error = '';
			await new Promise(resolve => setTimeout(resolve, 1000));
			goto(ROUTES.VIEWER);
		} catch (err) {
			error = 'Invalid credentials';
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900">
	<!-- Left Panel - Hero Section -->
	<div class="lg:w-1/2 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-800 dark:to-gray-900 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
		<!-- Background Pattern -->
		<div class="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
		<div class="absolute inset-0 bg-gradient-radial from-primary-200/30 via-transparent to-transparent dark:from-primary-500/5"></div>
		
		<!-- Logo and Text -->
		<div class="relative z-10">
			<div class="mb-8">
				<Logo />
			</div>
			<p class="text-gray-700 dark:text-gray-300 text-lg lg:text-xl max-w-md mt-8">
				{APP_TAGLINE}
			</p>
		</div>

		<!-- Tech Illustration -->
		<div class="hidden lg:block relative h-96 z-10">
			<!-- Tech circles animation -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="relative w-48 h-48">
					<div class="absolute inset-0 border border-primary-400/30 dark:border-primary-500/10 rounded-full animate-pulse"></div>
					<div class="absolute inset-4 border border-primary-400/40 dark:border-primary-500/15 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
					<div class="absolute inset-8 border border-primary-400/50 dark:border-primary-500/20 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
					<div class="absolute inset-12 border border-primary-400/60 dark:border-primary-500/25 rounded-full animate-pulse" style="animation-delay: 0.6s"></div>
					<!-- Center dot -->
					<div class="absolute inset-[40%] bg-primary-400/40 dark:bg-primary-500/20 backdrop-blur-sm rounded-full"></div>
				</div>
			</div>
			<!-- Floating elements -->
			<div class="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-primary-400/30 to-primary-300/20 dark:from-primary-500/10 dark:to-transparent backdrop-blur-xl rounded-xl transform rotate-12 animate-float"></div>
			<div class="absolute bottom-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-primary-300/30 to-primary-200/20 dark:from-primary-500/10 dark:to-transparent backdrop-blur-xl rounded-xl transform -rotate-12 animate-float" style="animation-delay: 0.3s"></div>
		</div>
	</div>

	<!-- Right Panel - Login Form -->
	<div class="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-white dark:bg-gray-900">
		<div class="w-full max-w-md space-y-8">
			<div class="text-center lg:text-left">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">
					Welcome Back
				</h2>
				<p class="mt-2 text-gray-600 dark:text-gray-400">
					Sign in to continue your AR experience
				</p>
			</div>

			<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
				{#if error}
					<div class="rounded-lg bg-red-50 dark:bg-red-500/10 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800 dark:text-red-400">
									{error}
								</h3>
							</div>
						</div>
					</div>
				{/if}

				<div class="space-y-4">
					<Input
						id="email"
						name="email"
						type="email"
						label="Email address"
						bind:value={email}
						placeholder="Enter your email"
						required
						icon="email"
					/>

					<Input
						id="password"
						name="password"
						type="password"
						label="Password"
						bind:value={password}
						placeholder="Enter your password"
						required
						icon="password"
					/>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							bind:checked={rememberMe}
							class="h-4 w-4 rounded border-gray-300 bg-white text-primary-600 focus:ring-primary-500 dark:border-gray-800 dark:bg-gray-900 dark:text-primary-500"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-400">
							Remember me
						</label>
					</div>
				</div>

				<Button type="submit" loading={isLoading} disabled={isLoading} fullWidth>
					Sign in
				</Button>

				<div class="text-center text-sm">
					<p class="text-gray-600 dark:text-gray-500">
						By signing in, you agree to our
						<a href={ROUTES.PRIVACY} class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"> Privacy Policy </a>
						and
						<a href={ROUTES.TERMS} class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"> Terms of Service </a>
					</p>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.bg-grid-pattern {
		background-image: linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	:global(.dark) .bg-grid-pattern {
		background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0) rotate(12deg);
		}
		50% {
			transform: translateY(-10px) rotate(12deg);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style> 