import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'AR Viewer PWA',
				short_name: 'AR Viewer',
				description: 'AR Viewer for 3D Models',
				theme_color: '#0ea5e9',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: 'icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png'
					},
					{
						src: 'icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png'
					},
					{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: 'icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png'
					},
					{
						src: 'icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png'
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			}
		})
	],
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					'three': ['three'],
					'threlte': ['@threlte/core', '@threlte/extras']
				}
			}
		}
	},
	optimizeDeps: {
		include: ['three', '@threlte/core', '@threlte/extras']
	},
	ssr: {
		noExternal: ['three', '@threlte/core', '@threlte/extras']
	}
});
