<template>
  <JobItem class="mb-3" v-for="job in curriculum.jobs" v-bind:key="job.id" :job="job" />
</template>

<script lang="ts">
import { useCurriculumStore } from '@/stores/curriculum-store'
import { mapState } from 'pinia'
import JobItem from '@/components/JobItem.vue'

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
  },
  components: { JobItem }
}
</script>

<style scoped></style>
