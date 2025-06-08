<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>Python voor beginners</h1>
            <h2>Aangeboden door Codeucation</h2>
            <h3>Eigen voortgang in deze cursus</h3>
            <progress class="course-progress large" max="100" :value="70"></progress>
            <h3>Huidig hoofdstuk</h3>
            <div class="chapters-container">
              <router-link to="/course/chapter" class="chapter-link">
                <div class="chapter-container">
                  <h4 class="chapter-title">Variabelen</h4>
                  <div class="chapter-info">
                    <progress class="course-progress" max="100" :value="70"></progress>
                    <div class="button-continue">
                      <p>Verdergaan</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                        <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <h3>Hoofdstuk kiezen</h3>
            <router-link to="/course/chapter" class="chapter-link">
              <div class="chapter-container">
                <h4 class="chapter-title">Variabelen</h4>
                <div class="chapter-info">
                  <progress class="course-progress" max="100" :value="50"></progress>
                  <div class="button-continue">
                    <p>Verdergaan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                      <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
                        <router-link to="/course/chapter" class="chapter-link">
              <div class="chapter-container">
                <h4 class="chapter-title">Variabelen</h4>
                <div class="chapter-info">
                  <progress class="course-progress" max="100" :value="50"></progress>
                  <div class="button-continue">
                    <p>Verdergaan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                      <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
                        <router-link to="/course/chapter" class="chapter-link">
              <div class="chapter-container">
                <h4 class="chapter-title">Variabelen</h4>
                <div class="chapter-info">
                  <progress class="course-progress" max="100" :value="50"></progress>
                  <div class="button-continue">
                    <p>Verdergaan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                      <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
                        <router-link to="/course/chapter" class="chapter-link">
              <div class="chapter-container">
                <h4 class="chapter-title">Variabelen</h4>
                <div class="chapter-info">
                  <progress class="course-progress" max="100" :value="50"></progress>
                  <div class="button-continue">
                    <p>Verdergaan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                      <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
                        <router-link to="/course/chapter" class="chapter-link">
              <div class="chapter-container">
                <h4 class="chapter-title">Variabelen</h4>
                <div class="chapter-info">
                  <progress class="course-progress" max="100" :value="50"></progress>
                  <div class="button-continue">
                    <p>Verdergaan</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                      <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </router-link>
          </div>

          <div class="column33 blue">
            <p class="column33-title">Afgewerkte oefeningen</p>
            <router-link v-for="n in 23" :key="n" to="/course/chapter" class="column33-listing">
              Naam oefening {{ n }}
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