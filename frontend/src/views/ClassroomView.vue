<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>{{ classroom?.name || 'Loading...' }}</h1>
            <h2>{{ classroom?.schoolName || 'Unknown School' }}</h2>
            <h3>Gekoppelde leraren</h3>
            <p v-if="classroom" class="gekoppelde-leraar">{{ classroom.teachers.join(', ') }}</p>
            <h3>Gekoppelde cursussen</h3>
            <div class="cursussen-container" v-if="classroom?.courses?.length">
              <router-link 
                v-for="course in classroom?.courses" 
                :key="course._id" 
                :to="`/course/${course._id}`" 
                class="cursus-link"
              >
                <div class="cursus-container">
                  <h4 class="cursus-title">{{ course.title }}</h4>
                    <div class="cursus-status">
                      <svg xmlns="http://www.w3.org/2000/svg" width="31.218" height="22.752" viewBox="0 0 31.218 22.752">
                        <g id="eye-open_outline" transform="translate(-14.5 -38.5)">
                          <path id="Path_20" data-name="Path 20" d="M30.109,40C21.13,40,16,49.876,16,49.876s5.13,9.876,14.109,9.876,14.109-9.876,14.109-9.876S39.087,40,30.109,40Z" fill="none" stroke="#001a72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                          <path id="Path_21" data-name="Path 21" d="M76.233,80.465A4.233,4.233,0,1,0,72,76.233,4.233,4.233,0,0,0,76.233,80.465Z" transform="translate(-46.124 -26.356)" fill="none" stroke="#001a72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        </g>
                      </svg>
                      <p v-if="!course.hidden">Zichtbaar voor leerlingen</p>

                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27.913 24.802">
                        <g id="Icon_hidden" transform="translate(-1.976 -3.879)">
                          <path d="M6,26.559,26.559,6M13.71,24.894a9.154,9.154,0,0,0,2.57.38c5.374,0,9.976-5.157,11.895-7.661a2.177,2.177,0,0,0,0-2.67,29.476,29.476,0,0,0-2.166-2.519" transform="translate(-0.347)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        </g>
                      </svg>
                      <p v-else>Verborgen voor leerlingen</p>
                    </div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="column33 blue">
            <p class="column33-title">Leerlingen</p>
            <router-link 
              v-for="student in classroom?.students" 
              :key="student._id" 
              :to="`/studentprofile/${student._id}`" 
              class="column33-listing"
            >
              {{ student.firstname }} {{ student.lastname }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const classroomId = route.params.classroomId;
const classroom = ref(null);

const fetchClassroomInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}`);
    console.log("Classroom courses:", classroom.value?.courses);
    classroom.value = response.data;
  } catch (error) {
    console.error("Error fetching classroom info:", error);
  }
};

onMounted(fetchClassroomInfo);
</script>

<style scoped>
.cursus-container {
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 20px;
    background-color: #D5E4FE;
    margin-bottom: 20px;
    cursor: pointer;
}
.cursus-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
}
.cursus-container:hover {
  background-color: #c3d8f5;
}
.cursus-container p{
    margin: 0px;
}
.cursus-title{
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0px;
    color: #031F67;
}
.cursus-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}
</style>