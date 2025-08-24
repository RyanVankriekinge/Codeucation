<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <div class="klassen-container">
              <router-link 
                v-for="classroom in classrooms" 
                :key="classroom._id" 
                class="klas-container" 
                :to="`/classroom/${classroom._id}`"
              >
                <p class="klas-naam">{{ classroom.name }}</p>
                <p class="klas-school">{{ classroom.schoolName }}</p>
                <p class="klas-aantal">{{ classroom.studentCount }} leerlingen</p>
              </router-link>
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Profile from '../components/Profile.vue';
import axios from 'axios';

const route = useRoute();
const user = ref(null);
const classrooms = ref([]);

async function checkLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/users/check-login', { credentials: 'include' });
    const result = await response.json();
    console.log('Check-login response:', result);
    if (result.success) {
      user.value = result;
      fetchClassrooms(result.userId);
    } else {
      user.value = null;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

async function fetchClassrooms(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/classroom-users/user/${userId}`);
    classrooms.value = response.data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
  }
}

onMounted(checkLogin);

watch(
  () => route.fullPath,
  () => {
    checkLogin();
  }
);
</script>


<style scoped>
.klassen-container{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding-right: 20px;
}
.klas-container{
  width: 48%;
  border-radius: 30px;
  min-height: 150px;
  min-width: 250px;
  background-color: #D5E4FE;
  text-decoration: none;
}
.klas-container:hover{
  background-color: #c3d8f5;
}
.klas-container p{
  margin: 20px;
}
.klas-naam{
  font-family: Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  font-size: 18px;
  color: #031F67;
  font-weight: bold;
  margin-bottom: 5px !important;
}
.klas-school{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 5px !important;
  color: black;
}
.klas-aantal{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 30px !important;
  color: black;
}
</style>