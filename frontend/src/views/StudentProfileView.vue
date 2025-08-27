<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>{{ user.firstname || 'Naam' }} {{ user.name || 'Leerling' }}</h1>
            <div v-for="course in courses" :key="course._id" class="course-section">
              <h2>{{ course.title }}</h2>
              <div v-for="chapter in course.chapters" :key="chapter._id" class="chapter-section">
                <h3>{{ chapter.title }}</h3>

                <div class="exercise-list">
                  <div 
                    v-for="exercise in chapter.exercises || []" 
                    :key="exercise._id"
                    class="exercise-list-item"
                    @click="goToExercise(course._id, chapter._id, exercise._id)"
                  >
                    <h4 class="exercise-title">{{ exercise.title }}</h4>
                    <div class="exercise-right-side">
                      <p class="exercise-status">{{ exercise.status || 'Niet gemaakt' }}</p>
                      <div class="naar-oefening">
                        <p>Naar oefening</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                          <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right"
                            d="M12,6,27,21,12,36" transform="translate(-9.879 -3.879)" fill="none"
                            stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = route.params.userId
const user = ref({ firstname: '', name: ''})
const courses = ref([])

const fetchCourses = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/${userId}/courses`,
      { withCredentials: true }
    )
    if (data.success) {
      user.value = data.user
      courses.value = data.courses
      console.log(data)
    }
  } catch (err) {
    console.error('Error fetching user courses:', err)
  }
}

const goToExercise = (courseId, chapterId, exerciseId) => {
  router.push(`/courses/${courseId}/chapters/${chapterId}/exercises/${exerciseId}`)
}

onMounted(fetchCourses)
</script>

<style scoped>
.chapter-section {
  margin-bottom: 40px;
}
.exercise-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f4ff;
  margin-bottom: 10px;
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
