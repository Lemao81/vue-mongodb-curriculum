<template>
  <v-card :title="getTitle()" :subtitle="getSubTitle()" :text="job.description">
    <div class="edit-button-container">
      <fai icon="fa-pen" @click="() => onEdit(job.id)"></fai>
      <fai class="ml-1" icon="fa-xmark" @click="() => onRemove(job.id)"></fai>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Job } from '@/models/job'
import moment from 'moment'
import { DATE_FORMAT } from '@/consts/consts'
import { createDate } from '@/helpers/helper'
import { useCurriculumStore } from '@/stores/curriculum-store'

export default {
  name: 'JobItem',
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  props: {
    job: {
      type: Job,
      required: true
    }
  },
  methods: {
    getTitle() {
      const start = this.job.startDate ? moment(createDate(this.job.startDate)).format(DATE_FORMAT) : '-'
      const end = this.job.isCurrent ? 'now' : this.job.endDate ? moment(createDate(this.job.endDate)).format(DATE_FORMAT) : '-'
      return `${start} - ${end}`
    },
    getSubTitle() {
      return `${this.job.jobTitle} at ${this.job.company}`
    },
    onEdit(id: string | undefined) {
      if (id) {
        console.log(id)
      }
    },
    async onRemove(id: string | undefined) {
      if (id) {
        const result = await this.$curriculumApi.removeJob(id)
        this.curriculumStore.$patch({
          curriculum: result.curriculum
        })
      }
    }
  }
}
</script>

<style scoped>
.edit-button-container {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}
.fa-pen,
.fa-xmark {
  width: 1rem;
  height: 2rem;
}
</style>
