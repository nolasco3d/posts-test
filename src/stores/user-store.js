import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: null
  }),
  getters: {},
  actions: {},
  persist: true
})
