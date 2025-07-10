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
                  <div class="cursus-status" @click="toggleCourseVisibility(course, $event)">
                    <svg v-if="!course.hidden" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 182.797 121.6">
                      <g id="eye-outline" transform="translate(-5.877 -36.48)">
                        <path id="Path_38" data-name="Path 38" d="M97.151,42.56c-29.617,0-60,17.142-83.915,51.425a6.08,6.08,0,0,0-.1,6.753C31.51,129.5,61.484,152,97.151,152c35.279,0,65.869-22.564,84.28-51.4a6.133,6.133,0,0,0,0-6.639C162.978,65.466,132.164,42.56,97.151,42.56Z" fill="none" stroke="#001a72" stroke-linecap="round" stroke-linejoin="round" stroke-width="12.16"/>
                        <circle id="Ellipse_4" data-name="Ellipse 4" cx="30.4" cy="30.4" r="30.4" transform="translate(66.88 66.88)" fill="none" stroke="#001a72" stroke-miterlimit="10" stroke-width="12.16"/>
                      </g>
                    </svg>
                    <p v-if="!course.hidden">Zichtbaar voor leerlingen</p>
                    <svg v-show="course.hidden" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 182.404 145.81">
                      <g id="eye-off-outline" transform="translate(-6.072 -24.43)">
                        <path id="Path_31" data-name="Path 31" d="M164.16,170.24a6.049,6.049,0,0,1-4.3-1.782L26.1,34.7a6.08,6.08,0,0,1,8.6-8.6l133.76,133.76a6.08,6.08,0,0,1-4.3,10.378Z" fill="#001a72"/>
                        <path id="Path_32" data-name="Path 32" d="M97.151,145.92c-15.766,0-30.97-4.666-45.19-13.87-12.947-8.36-24.6-20.334-33.706-34.58v-.03A138.259,138.259,0,0,1,43.046,70a.76.76,0,0,0,.053-1.117l-7.57-7.558a.76.76,0,0,0-1.03-.046A150.693,150.693,0,0,0,8.25,90.508a12.13,12.13,0,0,0-.243,13.505c10.036,15.705,22.952,28.933,37.346,38.247C61.56,152.76,79,158.08,97.151,158.08a90.87,90.87,0,0,0,28.8-4.78.76.76,0,0,0,.293-1.258l-8.2-8.2a1.52,1.52,0,0,0-1.455-.38,77.823,77.823,0,0,1-19.441,2.459Z" fill="#001a72"/>
                        <path id="Path_33" data-name="Path 33" d="M186.519,90.668a128.794,128.794,0,0,0-37.723-38.2C132.62,42.009,114.76,36.48,97.151,36.48a86.389,86.389,0,0,0-28.458,4.875.76.76,0,0,0-.285,1.258L76.6,50.8a1.52,1.52,0,0,0,1.474.38,73.272,73.272,0,0,1,19.08-2.542c15.462,0,30.62,4.723,45.049,14.06a116.55,116.55,0,0,1,34.109,34.58.049.049,0,0,1,0,.061,118.074,118.074,0,0,1-24.366,27.637.76.76,0,0,0-.057,1.121l7.562,7.558a.76.76,0,0,0,1.026.049,130.526,130.526,0,0,0,26.083-29.822,12.236,12.236,0,0,0-.038-13.216Z" fill="#001a72"/>
                        <path id="Path_34" data-name="Path 34" d="M97.28,60.8a36.434,36.434,0,0,0-8.121.912A.76.76,0,0,0,88.779,63l42.784,42.773a.76.76,0,0,0,1.284-.38A36.48,36.48,0,0,0,97.28,60.8Z" fill="#001a72"/>
                        <path id="Path_35" data-name="Path 35" d="M63,88.791a.76.76,0,0,0-1.284.38,36.48,36.48,0,0,0,43.7,43.7.76.76,0,0,0,.38-1.284Z" fill="#001a72"/>
                      </g>
                    </svg>
                    <p v-show="course.hidden">Verborgen voor leerlingen</p>
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
              {{ student.firstname }} {{ student.name }}
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

const toggleCourseVisibility = async (course, event) => {
  try {
    event.preventDefault();
    event.stopPropagation();
    const response = await axios.put(`http://localhost:3000/api/classroom-courses/${classroomId}/${course._id}/visibility`, {
      hidden: !course.hidden
    });

    if (response.data.updatedCourse) {
      course.hidden = response.data.updatedCourse.hidden; 
    }

    console.log(`Course ${course._id} visibility updated: ${course.hidden}`);
  } catch (error) {
    console.error("Error updating course visibility:", error);
  }
};


const fetchClassroomInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}`);
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