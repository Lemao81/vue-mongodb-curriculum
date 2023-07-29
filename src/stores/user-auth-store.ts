import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore('userAuth', {
  state: () => {
    return {
      username: '',
      accessToken: '',
      isAuthenticated: false
    }
  },
  actions: {
    login(username: string, accessToken: string) {
      this.username = username
      this.accessToken = accessToken
      this.isAuthenticated = true
    },
    logout() {
      this.$reset()
    }
  }
})
