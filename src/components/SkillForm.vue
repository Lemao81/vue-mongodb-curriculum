<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <!--    <v-text-field ref="skillInput" label="Skill" v-model.trim="skillName" :rules="[rules.required]" required></v-text-field>-->
    <v-combobox ref="skillInput" label="Skill" density="compact" @update:search="onUpdateSearch" :items="skills"></v-combobox>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import { EVENT_CANCEL, EVENT_SKILL } from '@/consts/event-consts'
import { Skill } from '@/models/skill'
import { fieldRequired } from '@/functions/validations'
import { skillApiService } from '@/services/apis/skill-api-service'

export default {
  name: 'SkillForm',
  data() {
    return {
      skillName: '',
      skills: ['abc', 'def'],
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    onOk() {
      const isValid = this.$refs.skillInput.checkValidity()
      if (!isValid) {
        this.$toast.warning('Input NOK')

        return
      }

      if (this.skillName) {
        const skill = new Skill(this.skillName)
        this.$emit(EVENT_SKILL, skill)
      }
    },
    onCancel() {
      this.$emit(EVENT_CANCEL)
    },
    async onUpdateSearch(search: string) {
      const result = await skillApiService.getSkillsStartingWith(search)
      if (result.skills) {
        this.skills = result.skills
      }
    }
  },
  emits: [EVENT_SKILL, EVENT_CANCEL],
  components: { CurriculumForm }
}
</script>

<style scoped></style>
