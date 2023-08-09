<template>
  <div>
    <CurriculumSection :title="'Skills'" :list-component="'SkillList'" :form-component="'SkillForm'" />
    <CurriculumSection :title="'Jobs'" :list-component="'JobList'" :form-component="'JobForm'" />
    <CurriculumSection :title="'Education'" :list-component="'EducationList'" :form-component="'EducationForm'" />
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
