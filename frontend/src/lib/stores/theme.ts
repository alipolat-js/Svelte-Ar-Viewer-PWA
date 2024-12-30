import { writable, get } from 'svelte/store';

type Theme = 'light' | 'dark';

function createThemeStore() {
    // Get initial theme from localStorage or system preference
    const getInitialTheme = (): Theme => {
        if (typeof window === 'undefined') return 'light';
        
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) return savedTheme;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const store = writable<Theme>(getInitialTheme());

    // Update document class and localStorage when theme changes
    store.subscribe(theme => {
        if (typeof window === 'undefined') return;

        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    return {
        subscribe: store.subscribe,
        toggle: () => {
            const currentTheme = get(store);
            store.set(currentTheme === 'dark' ? 'light' : 'dark');
        },
        set: (theme: Theme) => store.set(theme),
    };
}

export const theme = createThemeStore(); 