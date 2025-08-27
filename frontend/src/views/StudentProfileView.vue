<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="full-width">
            <h1 style="margin-bottom: 10px;">
              {{ user.firstname || 'Naam' }} {{ user.name || 'Leerling' }}
            </h1>
            <label for="courseSelect" class="paragraph" style="margin-right: 10px;">Selecteer cursus:</label>
            <div class="custom-select">
              <select v-model="currentCourseId" id="courseSelect" @focus="isOpen = true" @blur="isOpen = false">
                <option v-for="course in courses" :key="course._id" :value="course._id">
                  {{ course.title }}
                </option>
              </select>
              <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 44.047 23.523">
                <path d="M6,13.5,25.9,33.4,45.8,13.5" transform="translate(-3.879 -11.379)" fill="none" stroke="#FFFFFF"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 44.047 23.523">
                <path d="M6,33.4,25.9,13.5,45.8,33.4" transform="translate(-3.879 -12)" fill="none" stroke="#FFFFFF"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
              </svg>
            </div>
            <h2 v-if="currentCourse" style="margin-top: 20px;">{{ currentCourse.title }}</h2>
            <div v-if="currentCourse" style="width: 100%;">
              <div v-for="chapter in currentCourse.chapters" :key="chapter._id" class="chapter-container">
                <div class="chapter-header" @click="chapter.open = !chapter.open">
                  <h3>{{ chapter.orderIndex }}. {{ chapter.title }}</h3>
                  <svg v-if="!chapter.open" xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                    viewBox="0 0 44.047 23.523">
                    <path d="M6,13.5,25.9,33.4,45.8,13.5" transform="translate(-3.879 -11.379)" fill="none"
                      stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 44.047 23.523">
                    <path d="M6,33.4,25.9,13.5,45.8,33.4" transform="translate(-3.879 -12)" fill="none" stroke="#031F67"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                  </svg>
                </div>

                <div v-show="chapter.open" class="exercise-list">
                  <div v-for="exercise in chapter.exercises || []" :key="exercise._id" class="exercise-list-item"
                    @click="goToExercise(currentCourse._id, chapter._id, exercise._id)">
                    <h4 class="exercise-title">{{ exercise.title }}</h4>
                    <div class="exercise-right-side">
                      <p class="exercise-status">{{ exercise.status || 'Niet gemaakt' }}</p>
                      <div class="naar-oefening">
                        <p>Naar oefening</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                          <path d="M12,6,27,21,12,36" fill="none" stroke="#707070" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.userId
const user = ref({ firstname: '', name: '' })
const courses = ref([])
const currentCourseId = ref(null)
const isOpen = ref(false)

const fetchCourses = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/${userId}/courses`,
      { withCredentials: true }
    )
    if (data.success) {
      user.value = data.user
      courses.value = data.courses
      courses.value.forEach(course => {
        course.chapters.forEach(chapter => chapter.open = false)
      })

      if (courses.value.length) currentCourseId.value = courses.value[0]._id
    }
  } catch (err) {
    console.error('Error fetching user courses:', err)
  }
}

const currentCourse = computed(() => {
  return courses.value.find(c => c._id === currentCourseId.value)
})

const goToExercise = (courseId, chapterId, exerciseId) => {
  router.push(`/courses/${courseId}/chapters/${chapterId}/exercises/${exerciseId}`)
}

onMounted(fetchCourses)
</script>

<style scoped>
.chapter-container {
  margin-bottom: 20px;
  background-color: #a6cced;
  border-radius: 10px;
  width: 100%;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.chapter-header h3{
  margin: auto 20px;
}

.exercise-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f4ff;
  margin: 5px 10px;
  cursor: pointer;
}

.exercise-list-item:hover {
  background-color: #d5e4fe;
}

.exercise-right-side {
  display: flex;
  align-items: center;
  gap: 10px;
}

.exercise-status {
  font-weight: bold;
}

.naar-oefening {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
