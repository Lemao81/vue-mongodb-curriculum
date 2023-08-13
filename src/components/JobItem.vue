<template>
  <v-card :title="getTitle()" :subtitle="getSubTitle()" :text="job.description"></v-card>
</template>

<script lang="ts">
import { Job } from '@/models/job'
import moment from 'moment'
import { DATE_FORMAT } from '@/consts/consts'

export default {
  name: 'JobItem',
  props: {
    job: {
      type: Job,
      required: true
    }
  },
  methods: {
    getTitle() {
      return `${moment(this.job.startDate).format(DATE_FORMAT)} - ${this.job.isCurrent ? 'now' : moment(this.job.endDate).format(DATE_FORMAT)}`
    },
    getSubTitle() {
      return `${this.job.jobTitle} at ${this.job.company}`
    }
  }
}
</script>

<style scoped></style>
