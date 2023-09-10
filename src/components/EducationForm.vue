<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <v-container>
      <DateRangePicker v-model:start-date="startDate" v-model:end-date="endDate" v-model:is-current="isCurrent"></DateRangePicker>
      <v-row>
        <v-col cols="12">
          <v-text-field ref="institute" label="Institute" density="compact" v-model.trim="institute" :rules="[rules.required]" required></v-text-field>
          <v-text-field ref="degree" label="Degree" density="compact" v-model.trim="degree" :rules="[rules.required]" required></v-text-field>
          <v-text-field ref="grade" label="Grade" density="compact" type="number" v-model.trim="grade"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import { EVENT_CANCEL, EVENT_EDUCATION } from '@/consts/event-consts'
import DateRangePicker from '@/components/DateRangePicker.vue'
import { fieldRequired } from '@/functions/validations'
import { Education } from '@/models/education'
import type { VTextField } from 'vuetify/components'
import type { EducationFormComponentData } from '@/interfaces/education-form-component-data'
import { isNumber } from '@/helpers/helper'

export default {
  name: 'EducationForm',
  props: {
    education: {
      type: Education,
      required: false
    }
  },
  data(): EducationFormComponentData {
    return {
      id: this.education?.id,
      startDate: this.education?.startDate,
      endDate: this.education?.endDate,
      isCurrent: this.education?.isCurrent || false,
      institute: this.education?.institute || '',
      degree: this.education?.degree || '',
      grade: this.education?.grade?.toString() || '',
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
        (this.$refs.institute as VTextField).checkValidity() &&
        (this.$refs.degree as VTextField).checkValidity() &&
        (!this.grade || isNumber(this.grade))
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      const education = new Education(
        this.id,
        this.startDate,
        this.endDate,
        this.isCurrent,
        this.institute,
        this.degree,
        this.grade ? parseFloat(this.grade) : undefined
      )
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
