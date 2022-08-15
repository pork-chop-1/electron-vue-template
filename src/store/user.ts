import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    name: null,
    accessToken: '',
    lastLogin: null,
    isDark: false,
  }),
});

export default useUser;
