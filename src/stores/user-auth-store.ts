import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore('userAuth', {
  state: () => {
    return {
      userId: '',
      username: '',
      accessToken: '',
      isAuthenticated: false
    }
  },
  actions: {
    login(userId: string, username: string, accessToken: string) {
      this.userId = userId
      this.username = username
      this.accessToken = accessToken
      this.isAuthenticated = true
    },
    logout() {
      this.$reset()
    }
  }
})
