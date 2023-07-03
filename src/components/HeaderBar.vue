<template>
  <div class="header-bar-container">
    <p>Curriculum Creator</p>
    <nav>
      <RouterLink to="/">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/curriculum">Curriculum</RouterLink>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderBar'
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
