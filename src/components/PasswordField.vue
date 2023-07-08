<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-text-field
        ref="password"
        label="Password"
        v-model="passwordData"
        @input="onPasswordChange"
        :type="getPasswordFieldType()"
        :rules="[rules.required]"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="1">
      <fai icon="eye" @click="onShowPassword"></fai>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { fieldRequired } from '@/functions/validations.function'

export default {
  name: 'PasswordField',
  props: {
    password: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordData: this.password,
      showPasswordData: this.showPassword,
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    getPasswordFieldType() {
      return this.showPasswordData ? 'text' : 'password'
    },
    onPasswordChange() {
      this.$emit('update:password', this.passwordData)
    },
    onShowPassword() {
      this.showPasswordData = !this.showPasswordData
      this.$emit('update:showPassword', this.showPasswordData)
    },
    checkValidity(): boolean {
      return this.$refs.password.checkValidity()
    }
  },
  emits: ['update:password', 'update:showPassword']
}
</script>

<style scoped></style>
