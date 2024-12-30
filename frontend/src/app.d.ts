/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		interface Locals {
			user?: {
				id: string;
				email: string;
				role: 'admin' | 'user';
			};
		}
		interface PageData {
			user?: {
				id: string;
				email: string;
				role: 'admin' | 'user';
			};
		}
		interface Platform {}
	}

	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition?(callback: () => Promise<void> | void): ViewTransition;
	}
}

export {};
