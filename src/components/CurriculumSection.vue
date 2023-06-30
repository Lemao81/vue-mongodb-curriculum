<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="body-container">
      <div class="content-container">
        <div class="form-container" v-if="isEdit">
          <component :is="formComponent" @skill="onSkill" @job="onJob" @education="onEducation" @cancel="onCancel"></component>
        </div>
      </div>
      <fai icon="fa-plus" v-if="!isEdit" @click="onAdd"></fai>
    </div>
  </section>
</template>

<script lang="ts">
import SkillForm from '@/components/SkillForm.vue'
import JobForm from '@/components/JobForm.vue'
import EducationForm from '@/components/EducationForm.vue'
import { Skill } from '@/models/skill.model'
import { Job } from '@/models/job.model'
import { Education } from '@/models/education.model'

export default {
  props: ['title', 'formComponent'],
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    onAdd() {
      this.isEdit = true
    },
    onSkill(skill: Skill) {
      console.log(skill)
      this.isEdit = false
    },
    onJob(job: Job) {
      console.log(job)
      this.isEdit = false
    },
    onEducation(education: Education) {
      console.log(education)
      this.isEdit = false
    },
    onCancel() {
      this.isEdit = false
    }
  },
  components: { SkillForm, JobForm, EducationForm }
}
</script>

<style scoped>
section {
  padding: 0.5rem;
}
.body-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
.fa-plus {
  width: 1em;
}
.form-container {
  padding: 0.5rem;
}
</style>
