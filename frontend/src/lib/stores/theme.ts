import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
    if (!browser) return 'light';
    
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Create theme store
const theme = writable<Theme>(getInitialTheme());

// Subscribe to changes and update DOM
if (browser) {
    theme.subscribe(value => {
        localStorage.setItem('theme', value);
        if (value === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}

// Helper functions
export const themeHelpers = {
    toggle: () => {
        theme.update(current => current === 'light' ? 'dark' : 'light');
    },
    setTheme: (newTheme: Theme) => {
        theme.set(newTheme);
    }
};

export { theme }; 