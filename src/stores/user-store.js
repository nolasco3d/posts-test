import { defineStore } from "pinia";
// import { LocalStorage } from 'quasar'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: null
    // user:  LocalStorage.getItem('user') || null,
    // isAuthenticated: LocalStorage.getItem('isAuthenticated') || null
  }),
  getters: {},
  actions: {

  }
})
