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
import { fieldRequired } from '@/functions/validations.function'
import PasswordField from '@/components/PasswordField.vue'
import UsernameField from '@/components/UsernameField.vue'

export default {
  name: 'LoginView',
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
      const isValid = this.$refs.username.checkValidity() && this.$refs.password.checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      const isLoggedIn = await this.$authApi.login(this.username, this.password)
      if (isLoggedIn) {
        this.$router.push('/curriculum')
      }
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
