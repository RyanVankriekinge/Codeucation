<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div style="width: 100%;">
            <h1>{{ chapter?.title }}</h1>
            <h2 style="margin-bottom: 30px;">Cursus: {{ chapter?.courseTitle }}</h2>

            <div class="tab-menu">
              <button
                class="tab"
                :class="{ active: activeTab === 'leerpad' }"
                @click="activeTab = 'leerpad'"
              >
                Leerpad
              </button>
              <button
                class="tab"
                :class="{ active: activeTab === 'oefeningen' }"
                @click="activeTab = 'oefeningen'"
              >
                Oefeningen
              </button>
            </div>
            <div v-if="activeTab === 'leerpad'" class="chapter-box theorie-box">
              <div v-html="chapter?.theory"></div>

              <button class="big-button" @click="activeTab = 'oefeningen'">
                Naar de oefeningen
              </button>
            </div>
            <div v-else class="chapter-box oefeningen-box">
              <h3 style="margin-top: 10px !important;">Oefeningen</h3>
              <p style="margin-bottom: 30px;">Hier staan de oefeningen die bij dit hoofdstuk horen.</p>
              <div class="exercise-list">
                <div
                  v-for="exercise in chapter?.exercises || []"
                  :key="exercise._id"
                  class="exercise-list-item"
                  @click="goToExercise(exercise._id)"
                >
                  <h3 class="exercise-title">{{ exercise.title }}</h3>
                  <div class="exercise-right-side">
                    <p class="exercise-status">{{ exercise.status || 'Niet gestart' }}</p>
                    <div class="naar-oefening">
                      <p>Naar oefening</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                        <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6,27,21,12,36"
                          transform="translate(-9.879 -3.879)" fill="none" stroke="#707070" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="3"/>
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
  </main>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const chapterId = route.params.chapterId
const activeTab = ref('leerpad')

onMounted(() => {
  const savedTab = localStorage.getItem(`chapter-${chapterId}-activeTab`)
  if (savedTab) activeTab.value = savedTab
})

watch(activeTab, (newVal) => {
  localStorage.setItem(`chapter-${chapterId}-activeTab`, newVal)
})

const chapter = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/chapters/${chapterId}`)
    chapter.value = data.chapter
  } catch (error) {
    console.error('Error loading chapter:', error)
  }
})

function goToExercise(exerciseId) {
  router.push(`/course/chapter/${chapterId}/exercise/${exerciseId}`)
}
</script>

<style scoped>
.tab-menu {
  display: flex;
  width: fit-content;
}

.tab {
  background-color: transparent;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s, color 0.3s;
  margin-bottom: -2px;
}

.tab:hover {
  color: #333;
}

.tab.active {
  border: 2px solid grey;
  border-radius: 15px 15px 0px 0px;
  border-bottom: 3px transparent;
  color: #031F67;
  font-weight: bold;
  background-color: white;
}

.chapter-box {
  margin-bottom: 50px;
  padding: 20px;
  border: 2px solid grey;
  width: 100%;
}

.theorie-box {
  border-radius: 0px 30px 30px 30px;
}

.oefeningen-box {
  border-radius: 30px;
}

.exercise-list-item {
  border-top: grey solid 2px;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.exercise-list-item h3 {
  margin: 0px;
}

.exercise-list-item:hover {
  background-color: lightblue;
  cursor: pointer;
}

.exercise-status {
  padding: 10px;
  background-color: #031F67;
  width: fit-content;
  text-align: center;
  color: white;
  border-radius: 7px;
  margin-left: 10px;
}

.naar-oefening{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.exercise-title{
  width: 100%;
}

.exercise-right-side{
  display: flex;
  justify-content: space-between;
  width: 350px;
}
</style>