<template>
  <curriculum-form @ok="onOk" @cancel="onCancel">
    <v-text-field ref="skillInput" label="Skill" v-model.trim="skillName" :rules="[rules.required]" required></v-text-field>
  </curriculum-form>
</template>

<script lang="ts">
import CurriculumForm from '@/components/CurriculumForm.vue'
import { EVENT_CANCEL, EVENT_SKILL } from '@/consts/events.const'
import { Skill } from '@/models/skill.model'
import { fieldRequired } from '@/functions/validations.function'

export default {
  name: 'SkillForm',
  data() {
    return {
      skillName: '',
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
    }
  },
  emits: [EVENT_SKILL, EVENT_CANCEL],
  components: { CurriculumForm }
}
</script>

<style scoped></style>
