<template>
  <div>
    <CurriculumSection :title="'Skills'" :form-component="'SkillForm'" />
    <CurriculumSection :title="'Jobs'" :form-component="'JobForm'" />
    <CurriculumSection :title="'Education'" :form-component="'EducationForm'" />
  </div>
</template>

<script lang="ts">
import CurriculumSection from '@/components/CurriculumSection.vue'

export default {
  name: 'CurriculumView',
  components: { CurriculumSection }
}
</script>

<style scoped></style>
