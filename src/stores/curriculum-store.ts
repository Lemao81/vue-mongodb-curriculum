import { defineStore } from 'pinia'
import { Curriculum } from '@/models/curriculum'

export const useCurriculumStore = defineStore('curriculum', {
  state: () => {
    return {
      curriculum: new Curriculum()
    }
  },
  actions: {
    logout() {
      this.$reset()
    }
  }
})
