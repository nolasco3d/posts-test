import { defineStore } from "pinia";
import { Loading } from "quasar";
import { api } from "src/boot/axios";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: null
  }),
  getters: {},
  actions: {
    async createUser (user) {
      try {
        const {data} = await api.post(`/users/`, user)
        if(data) {
          this.user = data
          this.isAuthenticated = true
          return true
        }
      } catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      } finally {
        Loading.hide()
      }
    },
    async loginUser (email) {
      try {
        const {data: userFind} = await api.get(`users?email=${email}`)

        if (!userFind.length) return false

        this.user = userFind[0]
        this.isAuthenticated = true
        return true

      } catch (err) {
        console.log(err)
        throw new Error(err)
      } finally {
        Loading.hide()
      }
    }
  },
  persist: true
})
