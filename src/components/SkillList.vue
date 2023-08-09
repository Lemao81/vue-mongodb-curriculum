<template>
  <div>
    <v-chip class="ma-1" v-for="skill in curriculum.skills" v-bind:key="skill.key" closable @click:close="() => onRemoveSkill(skill.key)" color="primary">{{
      skill.label
    }}</v-chip>
  </div>
</template>

<script lang="ts">
import { useCurriculumStore } from '@/stores/curriculum-store'
import { mapState } from 'pinia'

export default {
  name: 'SkillList',
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  computed: {
    ...mapState(useCurriculumStore, {
      curriculum: 'curriculum'
    })
  },
  methods: {
    async onRemoveSkill(key: string) {
      await this.$curriculumApi.removeSkill(key)
    }
  }
}
</script>

<style scoped></style>
