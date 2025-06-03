<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>5A Wetenschappen</h1>
            <h2>Atheneum</h2>
            <h3>Gekoppelde leraren</h3>
            <p class="gekoppelde-leraar">Ryan Vankriekinge</p>
            <h3>Gekoppelde cursussen</h3>
            <div class="cursussen-container">
              <router-link to="/course" class="cursus-link">
                <div class="cursus-container">
                  <h4 class="cursus-title">Python voor beginners</h4>
                  <div class="cursus-status">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.913" height="19.802" viewBox="0 0 27.913 24.802">
                      <g id="Icon_akar-eye-slashed" data-name="Icon akar-eye-slashed" transform="translate(-1.976 -3.879)">
                        <path id="Path_9" data-name="Path 9" d="M9.345,23.085A26.032,26.032,0,0,1,4.038,17.83a2.175,2.175,0,0,1,0-2.669C5.956,12.657,10.559,7.5,15.933,7.5a11.567,11.567,0,0,1,6.592,2.408" transform="translate(0 -0.215)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path id="Path_10" data-name="Path 10" d="M19.017,13.565a3.855,3.855,0,1,0-5.452,5.451M6,26.559,26.559,6M13.71,24.894a9.154,9.154,0,0,0,2.57.38c5.374,0,9.976-5.157,11.895-7.661a2.177,2.177,0,0,0,0-2.67,29.476,29.476,0,0,0-2.166-2.519" transform="translate(-0.347)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                      </g>
                    </svg>
                    <p>Verbergen voor leerlingen</p>
                  </div>
                </div>
              </router-link>
              <router-link to="/course" class="cursus-link">
                <div class="cursus-container">
                  <h4 class="cursus-title">Python voor beginners</h4>
                  <div class="cursus-status">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.913" height="19.802" viewBox="0 0 27.913 24.802">
                      <g id="Icon_akar-eye-slashed" data-name="Icon akar-eye-slashed" transform="translate(-1.976 -3.879)">
                        <path id="Path_9" data-name="Path 9" d="M9.345,23.085A26.032,26.032,0,0,1,4.038,17.83a2.175,2.175,0,0,1,0-2.669C5.956,12.657,10.559,7.5,15.933,7.5a11.567,11.567,0,0,1,6.592,2.408" transform="translate(0 -0.215)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        <path id="Path_10" data-name="Path 10" d="M19.017,13.565a3.855,3.855,0,1,0-5.452,5.451M6,26.559,26.559,6M13.71,24.894a9.154,9.154,0,0,0,2.57.38c5.374,0,9.976-5.157,11.895-7.661a2.177,2.177,0,0,0,0-2.67,29.476,29.476,0,0,0-2.166-2.519" transform="translate(-0.347)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                      </g>
                    </svg>
                    <p>Verbergen voor leerlingen</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="column33 blue">
            <p class="column33-title">Leerlingen</p>
            <router-link v-for="n in 23" :key="n" to="/studentprofile" class="column33-listing">
              Naam leerling {{ n }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

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