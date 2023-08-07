<template>
  <div class="header-bar-container">
    <p>Curriculum Creator</p>
    <nav>
      <v-btn v-if="isLoggedIn" @click="onLogout">Logout</v-btn>
      <RouterLink v-else to="/">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/curriculum">Curriculum</RouterLink>
    </nav>
  </div>
</template>

<script lang="ts">
import { useUserAuthStore } from '@/stores/user-auth-store'
import { mapState } from 'pinia'
import { useCurriculumStore } from '@/stores/curriculum-store'

export default {
  name: 'HeaderBar',
  setup() {
    return {
      userAuthStore: useUserAuthStore(),
      curriculumStore: useCurriculumStore()
    }
  },
  computed: {
    ...mapState(useUserAuthStore, {
      isLoggedIn: 'isAuthenticated'
    })
  },
  methods: {
    onLogout() {
      this.userAuthStore.$reset()
      this.curriculumStore.$reset()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header-bar-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
