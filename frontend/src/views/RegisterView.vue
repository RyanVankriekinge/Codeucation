<template>
  <main>
    <div class="outer-wrapper login-container">
        <div class="blue login-column-left">
            <div class="login-logo-container">
                <p class="logo-big">Code<span class="highlight-blue">ucation</span></p>
                <p class="slogan">Leer programmeren met directe feedback!</p>
            </div>
        </div>
        <div class="vertical-wave">
            <svg viewBox="0 0 200 1440" width="100%" height="100vh" xmlns="http://www.w3.org/2000/svg" style="position: relative;">
                <path d="M200,0 Q100,720 200,1440 L0,1440 L0,0 Z" fill="#031F67" />
            </svg>
        </div>
        <div class="white login-column-right login-form-container">
            <div class="login-form">
                <h1>Registreren</h1>
                <form>
                    <label for="achternaam">Achternaam</label>
                    <input type="achternaam" id="achternaam" required>

                    <label for="voornaam">Voornaam</label>
                    <input type="voornaam" id="voornaam" required>

                    <label for="email">Email</label>
                    <input type="email" id="email" required>

                    <label for="email-bevestigen">Email bevestigen</label>
                    <input type="email-bevestigen" id="email-bevestigen" required>
                    
                    <label for="wachtwoord">Wachtwoord</label>
                    <input type="wachtwoord" id="wachtwoord" required>

                    <label for="wachtwoord-bevestigen">Wachtwoord bevestigen</label>
                    <input type="wachtwoord-bevestigen" id="wachtwoord-bevestigen" required>
                    
                    <button type="submit" class="big-button">Ga aan de slag!</button>
                    <p class="button-subtitle">
                        Heb je al een account?
                        <a href="/login" class="button-subtitle-link">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </main>
</template>

<script setup>

</script>
