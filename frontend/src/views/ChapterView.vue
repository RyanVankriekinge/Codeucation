<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
          <div>
            <h1>1: Introductie tot Python</h1>
            <h2 style="margin-bottom: 30px;">Cursus: Python voor beginners</h2>
            <div class="tab-menu">
                <button class="tab active">Leerpad</button>
                <button class="tab">Oefeningen</button>
            </div>
            <div class="chapter-theory">
                <h3 style="margin-top: 10px !important;">Wat is Python?</h3>
                <p>Python is een veelzijdige en gebruiksvriendelijke programmeertaal die ideaal is voor zowel beginners als ervaren ontwikkelaars. Het wordt wereldwijd gebruikt voor een breed scala aan toepassingen. Python staat bekend om zijn eenvoudige en leesbare syntaxis, waardoor het een perfecte keuze is om te leren programmeren.</p>
                <h3>Eenvoudige syntax</h3>
                <p>De syntax van Python is eenvoudig ontworpen. Hier is een simpel voorbeeld om te laten zien hoe Python werkt:</p>
                <p class="code-segment">print("Welkom bij Python!")</p>
                <p class="code-explanation">Dit programma toont de tekst 'Welkom bij Python!' in de console.</p>
                <h3>Indentatie</h3>
                <p>In tegenstelling tot andere programmeertalen, maakt Python weinig gebruik van haakjes of acolades om de structuur van de code aan te geven. In plaats daarvan gebruikt Python indentatie, oftewel inspringing.</p>
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
                <router-link to="/course/chapter/exercises"><button class="big-button">Naar de oefeningen</button></router-link>
            </div>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>

<script setup>

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

</style>