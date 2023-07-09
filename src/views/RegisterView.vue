<template>
  <v-container class="register-container">
    <UsernameField ref="username" v-model:username="username" />
    <PasswordField ref="password" v-model:password="password" v-model:show-password="showPassword" />
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-text-field
          ref="passwordConfirmation"
          label="Confirm Password"
          v-model.trim="passwordConfirmation"
          :type="getPasswordFieldType()"
          :rules="[rules.required]"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-btn @click="onRegister">Register</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { fieldRequired } from '@/functions/validations.function'
import PasswordField from '@/components/PasswordField.vue'
import UsernameField from '@/components/UsernameField.vue'

export default {
  name: 'RegisterView',
  components: { UsernameField, PasswordField },
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    getPasswordFieldType() {
      return this.showPassword ? 'text' : 'password'
    },
    async onRegister() {
      const isValid = this.$refs.username.checkValidity() && this.$refs.password.checkValidity() && this.$refs.passwordConfirmation.checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      if (this.password !== this.passwordConfirmation) {
        this.$toast.warning('Password + confirmation must be equal')

        return
      }

      await this.$userApi.registerUser(this.username, this.password)
    }
  }
}
</script>

<style scoped>
.register-container {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
