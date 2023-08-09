<template>
  <v-container class="login-container">
    <UsernameField ref="username" v-model:username="username" />
    <PasswordField ref="password" v-model:password="password" />
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-btn @click="onLogin">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { fieldRequired } from '@/functions/validations'
import PasswordField from '@/components/PasswordField.vue'
import UsernameField from '@/components/UsernameField.vue'
import { useUserAuthStore } from '@/stores/user-auth-store'
import type { AccessTokenPayload } from '@/interfaces/access-token-payload'
import { extractJwtPayload } from '@/helpers/helper'
import type { VTextField } from 'vuetify/components'
import { useCurriculumStore } from '@/stores/curriculum-store'

export default {
  name: 'LoginView',
  setup() {
    return {
      userAuthStore: useUserAuthStore(),
      curriculumStore: useCurriculumStore()
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    async onLogin() {
      const isValid = (this.$refs.username as VTextField).checkValidity() && (this.$refs.password as VTextField).checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      const result = await this.$authApi.login(this.username, this.password)
      if (result.error || !result.accessToken) {
        this.$toast.error(result.error || 'No access token returned')
        return
      }

      const payload = extractJwtPayload<AccessTokenPayload>(result.accessToken)
      if (!payload) {
        console.error("Jwt payload couldn't be extracted")
        this.$toast.warning('Login failed')
        return
      }

      this.userAuthStore.$patch({
        userId: payload.userId,
        username: payload.username,
        accessToken: result.accessToken,
        isAuthenticated: true
      })

      const curriculumResult = await this.$curriculumApi.getCurriculum()
      if (curriculumResult.curriculum) {
        this.curriculumStore.$patch({
          curriculum: curriculumResult.curriculum
        })
      }

      this.$router.push('/curriculum')
    }
  },
  components: { UsernameField, PasswordField }
}
</script>

<style scoped>
.login-container {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
