<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section" style="margin-bottom: 100px;">
          <div class="column66">
            <h1>{{ course.title }}</h1>
            <h2>Aangeboden door Codeucation</h2>
            <h3>Eigen voortgang in deze cursus</h3>
            <progress class="course-progress large" max="100" :value="course.progress"></progress>

            <h3>Huidig hoofdstuk</h3>
            <div class="chapters-container" v-if="currentChapter">
              <router-link :to="`/courses/${courseId}/chapters/${currentChapter._id}`" class="chapter-link">
                <div class="chapter-container">
                  <h4 class="chapter-title">{{ currentChapter.title }}</h4>
                  <div class="chapter-info">
                    <progress class="course-progress" max="100" :value="currentChapter.progress"></progress>
                    <div class="button-continue">
                      <p>Verdergaan</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                        <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6,27,21,12,36"
                          transform="translate(-9.879 -3.879)" fill="none" stroke="#707070" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <h3>Hoofdstuk kiezen</h3>
            <div class="chapters-container">
              <router-link v-for="chapter in chapters" :key="chapter._id" :to="`/courses/${courseId}/chapters/${chapter._id}`"
                class="chapter-link">
                <div class="chapter-container">
                  <h4 class="chapter-title">{{ chapter.title }}</h4>
                  <div class="chapter-info">
                    <progress class="course-progress" max="100" :value="chapter.progress"></progress>
                    <div class="button-continue">
                      <p>Verdergaan</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                        <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6,27,21,12,36"
                          transform="translate(-9.879 -3.879)" fill="none" stroke="#707070" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="column33 blue">
            <p class="column33-title">Oefeningen</p>
            <router-link v-for="exercise in exercises" :key="exercise._id" 
              :to="`/courses/${course._id}/chapters/${exercise.chapterId}/exercises/${exercise._id}`"
              class="column33-listing">
              {{ exercise.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

const course = ref({})
const chapters = ref([])
const currentChapter = ref(null)
const exercises = ref([])
const courseId = route.params.courseId;

onMounted(async () => {
  try {
    const { data: courseData } = await axios.get(
      `http://localhost:3000/api/courses/${courseId}`,
      { withCredentials: true }
    );
    course.value = courseData;
    chapters.value = courseData.chapters || [];
    currentChapter.value = chapters.value[0] || null;

    const exercisesData = [];
    for (const chapter of chapters.value) {
      const { data: chapterProgressData } = await axios.get(
        `http://localhost:3000/api/exercise-progress/progress/${chapter._id}/current-user`,
        { withCredentials: true }
      );
      const chapterExercises = chapterProgressData.chapter.exercises || [];
      exercisesData.push(...chapterExercises.map(exercise => ({
        _id: exercise._id,
        title: exercise.title,
        chapterId: exercise.chapterId,
        status: exercise.status || 'Niet gemaakt'
      })));
    }
    exercises.value = exercisesData;

    function getExerciseProgress(exercise) {
      switch (exercise.status) {
        case 'Klaar': return 1;
        case 'Gedeeltelijk juist': return 0.5;
        default: return 0;
      }
    }

    function calculateChapterProgress(chapterExercises) {
      if (!chapterExercises.length) return 0;
      const totalProgress = chapterExercises.reduce((sum, ex) => sum + getExerciseProgress(ex), 0);
      return (totalProgress / chapterExercises.length) * 100;
    }

    chapters.value.forEach(chapter => {
      const chExercises = exercises.value.filter(exercise => exercise.chapterId === chapter._id);
      console.log(`Chapter ${chapter.title} statuses:`, chExercises.map(e => e.status));
      chapter.progress = calculateChapterProgress(chExercises);
    });

    function calculateCourseProgress(allChapters) {
      if (!allChapters.length) return 0;
      const total = allChapters.reduce((sum, chapter) => sum + (chapter.progress || 0), 0);
      return total / allChapters.length;
    }

    course.value.progress = calculateCourseProgress(chapters.value);

  } catch (error) {
    console.error('Error fetching course data:', error);
  }
});


</script>

<style scoped>
.chapters-container{
    margin-bottom: 50px;
}
.chapter-container {
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 20px;
    background-color: #D5E4FE;
    margin-bottom: 20px;
    cursor: pointer;
}
.chapter-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
}
.chapter-container:hover {
  background-color: #c3d8f5;
}
.chapter-container p{
    margin: 0px;
}
.chapter-title{
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0px;
    color: #031F67;
}
.chapter-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    width: 100%;
}
.chapter-progress{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #031F67;
    margin: 0;
}
.button-continue {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.button-continue p{
    margin-right: 10px !important;

}
.course-progress {
  width: 60%;
  height: 15px;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #031F67;
}

.large{
  width: 100%;
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