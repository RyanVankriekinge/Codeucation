<template>
  <main>
    <div class="outer-wrapper">
      <div class="wrapper">
        <div class="section">
            <div class="column66">
            <h1>Oefening naam</h1>
            <h2 id="exerciseTitle"></h2>
            <label for="exerciseSelect">Huidige oefening: </label>
            <select id="exerciseSelect"></select>
            <div id="exerciseInstruction"></div>

            <textarea id="code" class="code-input-field" rows="10" placeholder="# Write your code here..."></textarea><br>
            <button @click="checkCode" class="big-button">Code testen</button>
            <pre id="result"></pre>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>
