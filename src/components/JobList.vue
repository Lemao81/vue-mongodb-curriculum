<template>

</template>

<script lang="ts">
import { useCurriculumStore } from '@/stores/curriculum-store'
import { mapState } from 'pinia'

export default {
  name: 'JobList',
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  computed: {
    ...mapState(useCurriculumStore, {
      curriculum: 'curriculum'
    })
  }
}
</script>

<style scoped></style>
