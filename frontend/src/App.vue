<template>
  <header>
    <div class="outer-wrapper desktop-nav">
      <div class="wrapper">
        <nav>
          <div class="nav-left">
            <p class="logo">Code<span class="highlight-blue">ucation</span></p>
            <ul class="nav-links">
              <li><router-link to="/">Handleiding</router-link></li>
            </ul>
          </div>

          <div class="login-button">
            <router-link to="/" class="button-small-white">Log in</router-link>
          </div>
        </nav>
      </div>
    </div>
  </header>
  <router-view>
  </router-view>
  <div></div>
  <footer>
    <div class="outer-wrapper">
      <div class="wrapper">
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>
