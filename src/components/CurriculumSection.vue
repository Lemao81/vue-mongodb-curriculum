<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="body-container">
      <div class="content-container">
        <div class="list-container">
          <component :is="listComponent"></component>
        </div>
        <div class="form-container" v-if="isEdit">
          <component :is="formComponent" @skill="onSkill" @job="onJob" @education="onEducation" @cancel="onCancel"></component>
        </div>
      </div>
      <fai class="mt-1 ml-2" icon="fa-plus" v-if="!isEdit" @click="onAdd"></fai>
    </div>
  </section>
</template>

<script lang="ts">
import SkillForm from '@/components/SkillForm.vue'
import JobForm from '@/components/JobForm.vue'
import EducationForm from '@/components/EducationForm.vue'
import { Skill } from '@/models/skill'
import { Job } from '@/models/job'
import { Education } from '@/models/education'
import SkillList from '@/components/SkillList.vue'
import JobList from '@/components/JobList.vue'
import EducationList from '@/components/EducationList.vue'
import { useCurriculumStore } from '@/stores/curriculum-store'

export default {
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    listComponent: {
      type: String,
      required: true
    },
    formComponent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    onAdd() {
      this.isEdit = true
    },
    async onSkill(skill: Skill) {
      const result = await this.$curriculumApi.addSkill(skill)
      if (result.error) {
        this.$toast.warning(result.error)
      } else {
        this.curriculumStore.$patch({ curriculum: result.curriculum })
      }
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
  components: { SkillList, SkillForm, JobList, JobForm, EducationList, EducationForm }
}
</script>

<style scoped>
section {
  padding: 0.5rem;
}
.body-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.5rem 0.5rem 0;
}
.fa-plus {
  width: 1em;
}
.list-container {
  padding: 0.5rem;
}
.form-container {
  padding: 0.5rem;
}
</style>
