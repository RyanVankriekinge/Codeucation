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
          <p class="login-title">Registreren</p>
          <form @submit.prevent="register">
            <label for="achternaam">Achternaam</label>
            <input v-model="achternaam" type="text" id="achternaam" required>

            <label for="voornaam">Voornaam</label>
            <input v-model="voornaam" type="text" id="voornaam" required>

            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" required>

            <label for="emailConfirm">Email bevestigen</label>
            <input v-model="emailConfirm" type="email" id="emailConfirm" required>

            <label for="password">Wachtwoord</label>
            <input v-model="password" type="password" id="password" required>

            <label for="passwordConfirm">Wachtwoord bevestigen</label>
            <input v-model="passwordConfirm" type="password" id="passwordConfirm" required>

            <label>Kies accounttype</label>
            <div class="role-selection">
              <label>
                <input type="radio" v-model="role" value="leraar" required>
                Leraar
              </label>
              <label>
                <input type="radio" v-model="role" value="leerling">
                Leerling
              </label>
            </div>

            <button type="submit" class="big-button">Ga aan de slag!</button>
            <p class="button-subtitle">
              Heb je al een account?
              <a href="/login" class="button-subtitle-link">Log in</a>
            </p>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      achternaam: '',
      voornaam: '',
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      role: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (this.email !== this.emailConfirm) {
        this.errorMessage = 'Emailadressen komen niet overeen.';
        return;
      }

      if (this.password !== this.passwordConfirm) {
        this.errorMessage = 'Wachtwoorden komen niet overeen.';
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.achternaam,
                firstname: this.voornaam,
                email: this.email,
                password: this.password,
                role: this.role
            }),
            credentials: 'include'
        });

        const result = await response.json();

        if (result.success) {
          alert('Registratie gelukt!');
          this.$router.push('/'); 
        } else {
          this.errorMessage = result.message || 'Er is een fout opgetreden.';
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.errorMessage = 'Er is een fout opgetreden. Probeer het opnieuw.';
      }
    }
  }
};
</script>
