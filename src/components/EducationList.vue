<template>
  <EducationItem class="mb-3" v-for="education in curriculum.educations" v-bind:key="education.id" :education="education" @remove="onRemoveEducation" />
  <v-dialog v-model="isDialog" width="auto">
    <v-card>
      <v-card-text> Do you really want to remove the education entry? </v-card-text>
      <v-card-actions>
        <v-btn class="ml-auto" color="primary" @click="onRemoveConfirmed">Remove</v-btn>
        <v-btn class="mr-auto" color="primary" @click="idToRemove = ''">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useCurriculumStore } from '@/stores/curriculum-store'
import { mapState } from 'pinia'
import EducationItem from '@/components/EducationItem.vue'

export default {
  name: 'JobList',
  data() {
    return {
      idToRemove: ''
    }
  },
  setup() {
    return {
      curriculumStore: useCurriculumStore()
    }
  },
  computed: {
    ...mapState(useCurriculumStore, {
      curriculum: 'curriculum'
    }),
    isDialog() {
      return !!this.idToRemove
    }
  },
  methods: {
    onRemoveEducation(id: string) {
      this.idToRemove = id
    },
    async onRemoveConfirmed() {
      const id = this.idToRemove
      this.idToRemove = ''
      if (id) {
        const result = await this.$curriculumApi.removeEducation(id)
        this.curriculumStore.$patch({
          curriculum: result.curriculum
        })
      }
    }
  },
  components: { EducationItem }
}
</script>

<style scoped></style>
