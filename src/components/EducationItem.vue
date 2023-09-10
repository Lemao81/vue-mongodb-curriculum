<template>
  <EducationForm v-if="isEdit" :education="education" @education="onEducation" @cancel="onCancel" />
  <v-card v-else :title="getTitle()" :subtitle="getSubTitle()">
    <div class="edit-button-container">
      <fai icon="fa-pen" @click="onEdit"></fai>
      <fai class="ml-1" icon="fa-xmark" @click="() => onRemove(education.id)"></fai>
    </div>
    <div>
      <v-card-text>
        <div class="mb-1">{{ education.degree }}</div>
        <div v-if="education.grade">Graduated with: {{ education.grade }}</div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment'
import { MONTH_YEAR_FORMAT } from '@/consts/consts'
import { createDate } from '@/helpers/helper'
import { useCurriculumStore } from '@/stores/curriculum-store'
import { EVENT_REMOVE } from '@/consts/event-consts'
import EducationForm from '@/components/EducationForm.vue'
import { Education } from '@/models/education'

export default {
  name: 'JobItem',
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  props: {
    education: {
      type: Education,
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
      const start = this.education.startDate ? moment(createDate(this.education.startDate)).format(MONTH_YEAR_FORMAT) : '-'
      const end = this.education.isCurrent ? 'now' : this.education.endDate ? moment(createDate(this.education.endDate)).format(MONTH_YEAR_FORMAT) : '-'
      return `${start} - ${end}`
    },
    getSubTitle() {
      return `${this.education.degree} at ${this.education.institute}`
    },
    onEdit() {
      this.isEdit = true
    },
    async onRemove(id: string | undefined) {
      if (id) {
        this.$emit(EVENT_REMOVE, id)
      }
    },
    async onEducation(education: Education) {
      const result = await this.$curriculumApi.updateEducation(education)
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
  components: { EducationForm }
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
.v-card-text {
  padding-top: 0;
}
.fa-pen,
.fa-xmark {
  width: 1rem;
  height: 2rem;
}
</style>
