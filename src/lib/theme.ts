export const themeKey = 'jia-theme';

export const initializeTheme = `(()=>{let theme;try{theme=localStorage.getItem('${themeKey}')}catch{}document.documentElement.dataset.theme=theme==='light'||theme==='dark'?theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`;
