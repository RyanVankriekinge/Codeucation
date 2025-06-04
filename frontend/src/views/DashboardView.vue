<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <div class="klassen-container">
              <router-link class="klas-container" to="/classroom">
                <p class="klas-naam">5A Wetenschappen</p>
                <p class="klas-school">Atheneum</p>
                <p class="klas-aantal">25 leerlingen</p>
              </router-link>
              <router-link class="klas-container" to="/classroom">
                <p class="klas-naam">5A Wetenschappen</p>
                <p class="klas-school">Atheneum</p>
                <p class="klas-aantal">25 leerlingen</p>
              </router-link>
              <router-link class="klas-container" to="/classroom">
                <p class="klas-naam">5A Wetenschappen</p>
                <p class="klas-school">Atheneum</p>
                <p class="klas-aantal">25 leerlingen</p>
              </router-link>
              <router-link class="klas-container" to="/classroom">
                <p class="klas-naam">5A Wetenschappen</p>
                <p class="klas-school">Atheneum</p>
                <p class="klas-aantal">25 leerlingen</p>
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
  import Profile from '../components/Profile.vue';
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