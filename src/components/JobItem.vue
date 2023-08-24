<template>
  <JobForm v-if="isEdit" :job="job" @job="onJob" @cancel="onCancel" />
  <v-card v-else :title="getTitle()" :subtitle="getSubTitle()" :text="job.description">
    <div class="edit-button-container">
      <fai icon="fa-pen" @click="onEdit"></fai>
      <fai class="ml-1" icon="fa-xmark" @click="() => onRemove(job.id)"></fai>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Job } from '@/models/job'
import moment from 'moment'
import { MONTH_YEAR_FORMAT } from '@/consts/consts'
import { createDate } from '@/helpers/helper'
import { useCurriculumStore } from '@/stores/curriculum-store'
import { EVENT_REMOVE } from '@/consts/event-consts'
import JobForm from '@/components/JobForm.vue'

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
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    getTitle() {
      const start = this.job.startDate ? moment(createDate(this.job.startDate)).format(MONTH_YEAR_FORMAT) : '-'
      const end = this.job.isCurrent ? 'now' : this.job.endDate ? moment(createDate(this.job.endDate)).format(MONTH_YEAR_FORMAT) : '-'
      return `${start} - ${end}`
    },
    getSubTitle() {
      return `${this.job.jobTitle} at ${this.job.company}`
    },
    onEdit() {
      this.isEdit = true
    },
    async onRemove(id: string | undefined) {
      if (id) {
        this.$emit(EVENT_REMOVE, id)
      }
    },
    async onJob(job: Job) {
      const result = await this.$curriculumApi.updateJob(job)
      this.curriculumStore.$patch({
        curriculum: result.curriculum
      })
      this.isEdit = false
    },
    onCancel() {
      this.isEdit = false
    }
  },
  emits: [EVENT_REMOVE],
  components: { JobForm }
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
