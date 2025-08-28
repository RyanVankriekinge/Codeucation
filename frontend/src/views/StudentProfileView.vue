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
            <div class="course-info">
              <h2 v-if="currentCourse" class="course-title">{{ currentCourse.title }}</h2>
              <progress class="course-progress large" max="100" :value="courseProgress"></progress>
            </div>
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
                    <h4 class="exercise-title paragraph">{{ exercise.title }}</h4>
                    <div class="exercise-right-side">
                      <progress class="exercise-progress" max="100"
                        :value="getExerciseProgressValue(exercise)"></progress>
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
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.userId
const user = ref({ firstname: '', name: '' })
const courses = ref([])
const currentCourseId = ref(null)
const isOpen = ref(false)
const courseProgress = ref(0)

const fetchCourses = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/${userId}/courses`,
      { withCredentials: true }
    )
    if (data.success) {
      user.value = data.user
      courses.value = data.courses.map(course => ({
        ...course,
        chapters: course.chapters.map(chapter => ({
          ...chapter,
          open: false,
          exercises: chapter.exercises || []
        }))
      }))
      if (courses.value.length) currentCourseId.value = courses.value[0]._id
    }
  } catch (err) {
    console.error('Error fetching user courses:', err)
  }
}

const currentCourse = computed(() => {
  return courses.value.find(c => c._id === currentCourseId.value) || null
})

const fetchCourseProgress = async (courseId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/${userId}/courses/${courseId}/progress`,
      { withCredentials: true }
    )

    if (data.success) {
      const courseIndex = courses.value.findIndex(c => c._id === courseId)
      if (courseIndex !== -1) {
        const previousChapters = courses.value[courseIndex].chapters
        const updatedCourse = data.course

        const mergedChapters = updatedCourse.chapters.map(chapter => {
          const previous = previousChapters.find(prev => prev._id === chapter._id)
          return {
            ...chapter,
            open: previous ? previous.open : false,
            exercises: chapter.exercises || []
          }
        })

        courses.value[courseIndex] = {
          ...courses.value[courseIndex],
          ...updatedCourse,
          chapters: mergedChapters
        }
      }
    }
  } catch (err) {
    console.error('Error fetching course progress:', err)
  }
}

watch(currentCourseId, (newCourseId) => {
  if (newCourseId) fetchCourseProgress(newCourseId)
})

watch(currentCourse, (course) => {
  if (!course || !course.chapters) return

  const getExerciseProgress = (exercise) => {
    switch ((exercise.status || '').toLowerCase()) {
      case 'klaar': return 1
      case 'gedeeltelijk juist': return 0.5
      default: return 0
    }
  }

  const calculateChapterProgress = (chapterExercises) => {
    if (!chapterExercises.length) return 0
    const total = chapterExercises.reduce((sum, ex) => sum + getExerciseProgress(ex), 0)
    return (total / chapterExercises.length) * 100
  }

  course.chapters.forEach(chapter => {
    const chExercises = chapter.exercises || []
    chapter.progress = calculateChapterProgress(chExercises)
  })

  courseProgress.value = course.chapters.length
    ? course.chapters.reduce((sum, ch) => sum + (ch.progress || 0), 0) / course.chapters.length
    : 0

}, { immediate: true })

const goToExercise = (courseId, chapterId, exerciseId) => {
  router.push(`/courses/${courseId}/chapters/${chapterId}/exercises/${exerciseId}`)
}

const getExerciseProgressValue = (exercise) => {
  const status = (exercise.status || '').toLowerCase()
  if (status === 'klaar' || status === 'done') return 100
  if (status === 'gedeeltelijk juist' || status === 'partially correct') return 50
  return 0
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

.chapter-header h3 {
  margin: auto 20px;
  padding: 10px 0px;
}

.exercise-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 20px;
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

.exercise-title {
  margin: 5px 0px;
  font-weight: 400;
}

.exercise-list {
  padding-bottom: 10px;
}

.exercise-progress {
  width: 270px;
  height: 12px;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #031F67;
}

.exercise-progress::-webkit-progress-bar {
  background-color: #ffffff;
  border-radius: 10px;
}

.exercise-progress::-webkit-progress-value {
  background-color: #031F67;
  border-radius: 10px;
}

.exercise-progress::-moz-progress-bar {
  background-color: #031F67;
  border-radius: 10px;
}

.course-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.course-progress {
  width: 60%;
  max-width: 300px;
  height: 15px;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #031F67;
}

.course-title {
  margin: 0px;
}

.course-progress::-webkit-progress-bar {
  background-color: #ffffff;
  border-radius: 10px;
}

.course-progress::-webkit-progress-value {
  background-color: #031F67;
  border-radius: 10px;
}

.course-progress::-moz-progress-bar {
  background-color: #031F67;
  border-radius: 10px;
}
</style>
