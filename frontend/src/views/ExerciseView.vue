<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
            <div class="column66">
          <div class="column66">
            <h1>Oefening naam</h1>
            <h2>{{ title }}</h2>

            <label for="exerciseSelect">Huidige oefening: </label>
            <select
              id="exerciseSelect"
              v-if="exercises.length"
              v-model="currentExerciseId"
            >
              <option
                v-for="exercise in exercises"
                :key="exercise._id"
                :value="exercise._id"
              >
                {{ exercise.title }}
              </option>
            </select>

            <div v-html="instruction"></div>

            <textarea
              v-model="codeArea"
              class="code-input-field"
              rows="10"
              placeholder="# Write your code here..."
            ></textarea><br>

            <button @click="checkCode" class="big-button">Code testen</button>
            <pre>{{ result }}</pre>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const exercises = ref([])
const currentExerciseId = ref(route.params.exerciseId)
const currentExercise = ref(null)

const title = ref('')
const instruction = ref('')
const codeArea = ref('')
const result = ref('')

const loadExercises = async () => {
  try {
    const chapterId = route.params.chapterId
    const res = await fetch(`http://localhost:3000/api/exercises/chapter/${chapterId}`)
    if (!res.ok) throw new Error('Failed to load exercises')
    exercises.value = await res.json()
    if (!currentExerciseId.value && exercises.value.length) {
      currentExerciseId.value = exercises.value[0]._id
    }
  } catch (err) {
    console.error('Failed to load exercises:', err)
  }
}

const loadExercise = async (exerciseId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/exercises/${exerciseId}`)
    if (!res.ok) throw new Error('Exercise not found')
    const data = await res.json()
    currentExercise.value = data
    title.value = data.title || ''
    instruction.value = data.instruction || ''
    codeArea.value = data.starterCode || ''
    result.value = ''
  } catch (err) {
    console.error('Failed to load exercise:', err)
    title.value = 'Error loading exercise'
    instruction.value = ''
    codeArea.value = ''
    result.value = ''
  }
}

watch(currentExerciseId, (newId) => {
  if (newId) {
    loadExercise(newId)
    router.replace({
      name: 'exercise',
      params: {
        courseId: route.params.courseId,
        chapterId: route.params.chapterId,
        exerciseId: newId
      }
    })
  }
})

onMounted(async () => {
  await loadExercises()
  if (currentExerciseId.value) {
    loadExercise(currentExerciseId.value)
  }
})
</script>
