<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div class="column66">
            <h1>Python voor beginners</h1>
            <h2>Aangeboden door Codeucation</h2>
            <h3>Inhoud van deze cursus</h3>
            <p class="course-description">Deze cursus biedt een uitgebreide introductie tot Python, met een focus op concepten en vaardigheden  die aansluiten bij de leerplannen van de derde graad secundair onderwijs. Onderwerpen zoals variabelen,  loops, functies, en datastructuren worden stap voor stap uitgelegd en aangevuld met relevante oefeningen.</p>
            <router-link to="/course/chapter"><button class="big-button">Leer deze cursus</button></router-link>
            <h3>Overzicht klassen</h3>
            <div class="classrooms-container">
                <router-link to="/classroom" class="classroom-link">
                    <div class="classroom-container">
                        <h4 class="classroom-title">5A Wetenschappen</h4>
                        <div class="classroom-info">
                        <p class="classroom-school">Atheneum</p>
                        <div class="button-progress">
                            <p>Voortgang bekijken</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                            <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>
                        </div>
                        </div>
                    </div>
                </router-link>
                <router-link to="/classroom" class="classroom-link">
                    <div class="classroom-container">
                        <h4 class="classroom-title">5B Economie</h4>
                        <div class="classroom-info">
                        <p class="classroom-school">Atheneum</p>
                        <div class="button-progress">
                            <p>Voortgang bekijken</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11.739" height="20.478" viewBox="0 0 11.739 20.478">
                            <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6l8.118,8.118L12,22.235" transform="translate(-9.879 -3.879)" fill="none" stroke="#031F67" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>
                        </div>
                        </div>
                    </div>
                </router-link>
            </div>
          </div>

          <div class="column33 blue">
            <p class="column33-title">Hoofdstukken</p>
            <router-link v-for="n in 23" :key="n" to="/studentprofile" class="column33-listing">
              Naam hoofdstuk {{ n }}
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
.classroom-container {
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 20px;
    background-color: #D5E4FE;
    margin-bottom: 20px;
    cursor: pointer;
}
.classroom-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
}
.classroom-container:hover {
  background-color: #c3d8f5;
}
.classroom-container p{
    margin: 0px;
}
.classroom-title{
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0px;
    color: #031F67;
}
.classroom-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    width: 100%;
}
.classroom-school{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #031F67;
    margin: 0;
}
.button-progress {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.button-progress p{
    margin-right: 10px !important;

}
</style>