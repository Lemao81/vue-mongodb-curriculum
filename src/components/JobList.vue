<template>
  <JobItem class="mb-3" v-for="job in curriculum.jobs" v-bind:key="job.id" :job="job" @remove="onRemoveJob" />
  <v-dialog v-model="isDialog" width="auto">
    <v-card>
      <v-card-text> Do you really want to remove the job entry? </v-card-text>
      <v-card-actions>
        <v-btn class="ml-auto" color="primary" @click="onRemoveConfirmed">Remove</v-btn>
        <v-btn class="mr-auto" color="primary" @click="idToRemove = ''">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useCurriculumStore } from '@/stores/curriculum-store'
import { mapState } from 'pinia'
import JobItem from '@/components/JobItem.vue'

export default {
  name: 'JobList',
  data() {
    return {
      idToRemove: ''
    }
  },
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  computed: {
    ...mapState(useCurriculumStore, {
      curriculum: 'curriculum'
    }),
    isDialog() {
      return !!this.idToRemove
    }
  },
  methods: {
    onRemoveJob(id: string) {
      this.idToRemove = id
    },
    async onRemoveConfirmed() {
      const id = this.idToRemove
      this.idToRemove = ''
      if (id) {
        const result = await this.$curriculumApi.removeJob(id)
        this.curriculumStore.$patch({
          curriculum: result.curriculum
        })
      }
    }
  },
  components: { JobItem }
}
</script>

<style scoped></style>
