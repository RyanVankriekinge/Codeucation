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
                <h1>Log in</h1>
                <form>
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                    
                    <label for="wachtwoord">Wachtwoord</label>
                    <input type="wachtwoord" id="wachtwoord" required>
                    
                    <button type="submit" class="big-button">Log In</button>
                    <p class="button-subtitle">
                        Heb je nog geen account?
                        <a href="/register" class="button-subtitle-link">Registreer</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </main>
</template>

<script setup>

</script>
