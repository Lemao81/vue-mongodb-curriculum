<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <v-container>
      <DateRangePicker v-model:start-date="startDate" v-model:end-date="endDate" v-model:is-current="isCurrent"></DateRangePicker>
      <v-row>
        <v-col cols="12">
          <v-text-field ref="company" label="Company" v-model.trim="company" :rules="[rules.required]" required></v-text-field>
          <v-text-field ref="jobTitle" label="Job title" v-model.trim="jobTitle" :rules="[rules.required]" required></v-text-field>
          <v-textarea ref="description" label="Description" v-model.trim="description" :rules="[rules.required]" required></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import { EVENT_CANCEL, EVENT_JOB } from '@/consts/events.const'
import '@vuepic/vue-datepicker/dist/main.css'
import { fieldRequired } from '@/functions/validations.function'
import { Job } from '@/models/job.model'

export default {
  name: 'JobForm',
  data() {
    return {
      startDate: null,
      endDate: null,
      isCurrent: false,
      company: '',
      jobTitle: '',
      description: '',
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    onOk() {
      const isValid =
        !!this.startDate &&
        (this.isCurrent || !!this.endDate) &&
        this.$refs.company.checkValidity() &&
        this.$refs.jobTitle.checkValidity() &&
        this.$refs.description.checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      const job = new Job(this.startDate, this.endDate, this.isCurrent, this.company, this.jobTitle, this.description)
      this.$emit(EVENT_JOB, job)
    },
    onCancel() {
      this.$emit(EVENT_CANCEL)
    }
  },
  emits: [EVENT_CANCEL, EVENT_JOB],
  components: { CurriculumForm, DateRangePicker }
}
</script>

<style scoped></style>
