<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-text-field ref="username" label="Username" density="compact" v-model.trim="usernameData" @input="onUsernameChange" :rules="[rules.required]" required></v-text-field>
    </v-col>
    <v-col cols="1">
      <v-spacer></v-spacer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { fieldRequired } from '@/functions/validations'

export default {
  name: 'UsernameField',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      usernameData: this.username,
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    onUsernameChange() {
      this.$emit('update:username', this.usernameData)
    },
    checkValidity(): boolean {
      return this.$refs.username.checkValidity()
    }
  },
  emits: ['update:username']
}
</script>

<style scoped></style>
