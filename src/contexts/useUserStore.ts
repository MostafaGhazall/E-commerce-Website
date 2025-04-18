import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the UserProfile interface with new fields
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  birthday: string;
  gender: string;
  city: string,
  country: string,
  postalcode: string,
  region: string,
  password: string; // Include password in the profile
  updateUserProfile: (profile: Omit<UserProfile, 'updateUserProfile'>) => void;
}

// Define custom storage to satisfy PersistStorage interface
const customStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  }
};

export const useUserStore = create<UserProfile>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      birthday: '',
      gender: '',
      city: '',
      country: '',
      postalcode: '',
      region: '',
      password: '', // Initialize password in the state
      updateUserProfile: (profile) => {
        // Update the user profile with the new data
        set({ ...profile });
      },
    }),
    {
      name: 'user-profile', // Key for local storage
      storage: customStorage, // Use custom storage
    }
  )
);
