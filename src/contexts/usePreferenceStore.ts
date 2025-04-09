import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Language = 'en' | 'ar'; // expand as needed

interface PreferenceState {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },

      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'preference-storage',
    }
  )
);
