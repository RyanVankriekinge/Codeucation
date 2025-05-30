<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <button class="big-button" @click="logout">
          Uitloggen
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

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
</script>
