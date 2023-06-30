<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <v-container>
      <DateRangePicker v-model:start-date="startDate" v-model:end-date="endDate" v-model:is-current="isCurrent"></DateRangePicker>
      <v-row>
        <v-col cols="12">
          <v-text-field ref="institute" label="Institute" v-model.trim="institute" :rules="[rules.required]" required></v-text-field>
          <v-text-field ref="degree" label="Degree" v-model.trim="degree" :rules="[rules.required]" required></v-text-field>
          <v-text-field ref="grade" label="Grade" type="number" v-model.trim="grade" :rules="[rules.required]" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import { EVENT_CANCEL, EVENT_EDUCATION } from '@/consts/events.const'
import DateRangePicker from '@/components/DateRangePicker.vue'
import { fieldRequired } from '@/functions/validations.function'
import { Education } from '@/models/education.model'

export default {
  name: 'EducationForm',
  data() {
    return {
      startDate: null,
      endDate: null,
      isCurrent: false,
      institute: '',
      degree: '',
      grade: '',
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
        this.$refs.institute.checkValidity() &&
        this.$refs.degree.checkValidity() &&
        this.$refs.grade.checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      const education = new Education(this.startDate, this.endDate, this.isCurrent, this.institute, this.degree, parseInt(this.grade || '0'))
      this.$emit(EVENT_EDUCATION, education)
    },
    onCancel() {
      this.$emit(EVENT_CANCEL)
    }
  },
  emits: [EVENT_CANCEL, EVENT_EDUCATION],
  components: { CurriculumForm, DateRangePicker }
}
</script>

<style scoped></style>
