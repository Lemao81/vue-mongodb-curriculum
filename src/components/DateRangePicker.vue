<template>
  <v-row>
    <v-col cols="4">
      From: <VueDatePicker :model-value="startDate" @update:model-value="onStartDateChange" required month-picker auto-apply></VueDatePicker>
    </v-col>
    <v-col cols="4">
      until: <VueDatePicker :model-value="endDate" @update:model-value="onEndDateChange" :disabled="isCurrent" required month-picker auto-apply></VueDatePicker>
    </v-col>
    <v-col cols="4">
      <v-checkbox :model-value="isCurrent" @update:model-value="onIsCurrentChange" label="Current"></v-checkbox>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { MonthYear } from '@/interfaces/month-year.interface'

export default {
  name: 'DateRangePicker',
  props: ['startDate', 'endDate', 'isCurrent'],
  methods: {
    onStartDateChange(monthYear: MonthYear) {
      this.$emit('update:startDate', monthYear)
    },
    onEndDateChange(monthYear: MonthYear) {
      this.$emit('update:endDate', monthYear)
    },
    onIsCurrentChange(isCurrent: boolean) {
      this.$emit('update:isCurrent', isCurrent)
    }
  },
  emits: ['update:startDate', 'update:endDate', 'update:isCurrent'],
  components: { VueDatePicker }
}
</script>

<style scoped></style>
