<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <v-combobox
      ref="skillInput"
      label="Skill"
      density="compact"
      :items="skills"
      item-title="label"
      item-value="key"
      @update:search="onUpdateSearch"
      @update:model-value="onSkillChange"
    ></v-combobox>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import { EVENT_CANCEL, EVENT_SKILL } from '@/consts/event-consts'
import { Skill } from '@/models/skill'
import { fieldRequired } from '@/functions/validations'
import { skillApiService } from '@/services/apis/skill-api-service'
import type { SkillFormComponentData } from '@/interfaces/skill-form-component-data'

export default {
  name: 'SkillForm',
  data(): SkillFormComponentData {
    return {
      skill: null,
      skills: new Array<Skill>(),
      rules: {
        required: fieldRequired
      }
    }
  },
  methods: {
    onOk() {
      if (this.skill) {
        this.$emit(EVENT_SKILL, this.skill)
        return
      }

      this.$toast.warning('No valid selection')
    },
    onCancel() {
      this.$emit(EVENT_CANCEL)
    },
    async onUpdateSearch(search: string) {
      const result = await skillApiService.getSkillsStartingWith(search)
      if (result.skills) {
        this.skills = result.skills
      }
    },
    onSkillChange(value: any) {
      this.skill = value instanceof Skill ? value : null
    }
  },
  emits: [EVENT_SKILL, EVENT_CANCEL],
  components: { CurriculumForm }
}
</script>

<style scoped></style>
