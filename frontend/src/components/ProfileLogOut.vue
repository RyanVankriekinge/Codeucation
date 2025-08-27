<template>
    <div class="profile-component-container">
        <div class="profile-picture-container" style="margin-top: 20px;">
            <img class="profile-picture" src="../assets/img/profilepicture.jpg">
        </div>
        <div class="profile-info-container" style="margin-top: 20px;">
            <p v-if="user" class="profile-name">{{ user.firstname }} {{ user.name }}</p>
            <p v-if="user" class="profile-role">{{ user.role }}</p>
            <router-link v-if="user" to="/profile" class="button-small-white button" @click="logout">Uitloggen</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const user = ref(null);
async function fetchUserInfo() {
  try {
    const response = await fetch('http://localhost:3000/api/users/check-login', {
      credentials: 'include'
    });
    const result = await response.json();
    console.log('User Info:', result);
    
    if (result.success) {
      user.value = result;
    } else {
      user.value = null;
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

async function logout() {
  try {
    const response = await fetch('http://localhost:3000/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const result = await response.json();
    if (result.success) {
      alert('Succesvol uitgelogd!');
      router.push('/');
    } else {
      alert('Uitloggen mislukt. Probeer opnieuw.');
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('Er is een fout opgetreden bij het uitloggen.');
  }
}

onMounted(fetchUserInfo);
</script>

<style scoped>
.profile-component-container {
    width: 30%;
    background-color: #031f67;
    padding: 20px;
    border-radius: 40px;
    color: white; 
    min-width: 250px;
}
.profile-name{
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
}
.profile-role{
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 20px;
}
.profile-info-container{
    display: flex;
    flex-wrap: wrap;
}
.button{
    margin: auto;
    margin-top: 5px;
    margin-bottom: 25px;
}
</style>