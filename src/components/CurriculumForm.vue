<template>
  <div class="container">
    <slot></slot>
    <div class="button-container">
      <v-btn @click="$emit(EVENT_OK)">Ok</v-btn>
      <v-btn variant="tonal" class="ml-2" @click="$emit(EVENT_CANCEL)">Cancel</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { EVENT_CANCEL, EVENT_OK } from '@/consts/event-consts'

export default {
  name: 'CurriculumForm',
  data() {
    return {
      EVENT_OK,
      EVENT_CANCEL
    }
  },
  emits: [EVENT_OK, EVENT_CANCEL]
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.button-container {
  padding: 0.5rem;
}
</style>
