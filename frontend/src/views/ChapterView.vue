<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div style="width: 100%;">
            <h1>1: Introductie tot Python</h1>
            <h2 style="margin-bottom: 30px;">Cursus: Python voor beginners</h2>
            <div class="tab-menu">
              <button class="tab" :class="{ active: activeTab === 'leerpad' }" @click="activeTab = 'leerpad'">
                Leerpad
              </button>
              <button class="tab" :class="{ active: activeTab === 'oefeningen' }" @click="activeTab = 'oefeningen'">
                Oefeningen
              </button>
            </div>
            <div v-if="activeTab === 'leerpad'" class="chapter-box theorie-box">
              <h3 style="margin-top: 10px !important;">Wat is Python?</h3>
              <p>
                Python is een veelzijdige en gebruiksvriendelijke programmeertaal die ideaal is
                voor zowel beginners als ervaren ontwikkelaars. Het wordt wereldwijd gebruikt voor
                een breed scala aan toepassingen. Python staat bekend om zijn eenvoudige en leesbare
                syntaxis, waardoor het een perfecte keuze is om te leren programmeren.
              </p>

              <h3>Eenvoudige syntax</h3>
              <p>
                De syntax van Python is eenvoudig ontworpen. Hier is een simpel voorbeeld om te
                laten zien hoe Python werkt:
              </p>
              <p class="code-segment">print("Welkom bij Python!")</p>
              <p class="code-explanation">
                Dit programma toont de tekst 'Welkom bij Python!' in de console.
              </p>

              <h3>Indentatie</h3>
              <p>
                In tegenstelling tot andere programmeertalen, maakt Python weinig gebruik van
                haakjes of acolades om de structuur van de code aan te geven. In plaats daarvan
                gebruikt Python indentatie, oftewel inspringing.
              </p>
              <div class="code-segment">
                <p>if True:</p>
                <p class="indented">print("Dit is een ingesprongen regel")</p>
              </div>
              <p>Zonder deze inspringing zal de code niet werken en krijg je een foutmelding:</p>
              <div class="code-segment">
                <p>if True:</p>
                <p>print("Dit zou niet werken")</p>
              </div>

              <h3>Zelf uittesten</h3>
              <p>Tijd om zelf aan de slag te gaan!</p>
              <router-link to="/course/chapter/exercises">
                <button class="big-button">Naar de oefeningen</button>
              </router-link>
            </div>
            <div v-else class="chapter-box oefeningen-box">
              <h3 style="margin-top: 10px !important;">Oefeningen</h3>
              <p style="margin-bottom: 30px;">Hier komen de oefeningen die bij dit hoofdstuk horen.</p>
              <div class="exercise-list">
                <div class="exercise-list-item">
                  <h3 class="exercise-title">1. Hello World!</h3>
                  <div class="exercise-right-side">
                                      <p class="exercise-status">Klaar</p>
                  <div class="naar-oefening">
                                      <p>Naar oefening</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 18.621 34.243">
                    <path id="Icon_akar-chevron-right" data-name="Icon akar-chevron-right" d="M12,6,27,21,12,36"
                      transform="translate(-9.879 -3.879)" fill="none" stroke="#707070" stroke-linecap="round"
                      stroke-linejoin="round" stroke-width="3"/>
                  </svg>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('leerpad')
</script>
<style scoped>
.tab-menu {
  display: flex;
  width: fit-content;
}

.tab {
  background-color: transparent;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s, color 0.3s;
  margin-bottom: -2px;
}

.tab:hover {
  color: #333;
}

.tab.active {
  border: 2px solid grey;
  border-radius: 15px 15px 0px 0px;
  border-bottom: 3px transparent;
  color: #031F67;
  font-weight: bold;
  background-color: white;
}

.chapter-box {
  margin-bottom: 50px;
  padding: 20px;
  border: 2px solid grey;
  width: 100%;
}

.theorie-box {
  border-radius: 0px 30px 30px 30px;
}

.oefeningen-box {
  border-radius: 30px;
}

.exercise-list-item {
  border-top: grey solid 2px;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.exercise-list-item h3 {
  margin: 0px;
}

.exercise-list-item:hover {
  background-color: lightblue;
}

.exercise-status {
  padding: 10px;
  background-color: #031F67;
  width: 50px;
  text-align: center;
  color: white;
  border-radius: 7px;
  margin-left: 10px;
}

.naar-oefening{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.exercise-title{
  width: 100%;
}

.exercise-right-side{
  display: flex;
  justify-content: space-between;
  width: 350px;
}
</style>