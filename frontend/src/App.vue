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
    <div v-if="isHome" class="nav-wave">
      <div class="outer-wrapper desktop-nav">
        <div class="wrapper">
          <div class="section introduction">
            <div class="column50">
              <p class="introduction-subtitle">Lesgeven met vertrouwen dankzij leerpaden en geautomatiseerde code testing</p>
              <p class="introduction-title">Leer programmeren met directe feedback!</p>
              <button>Ga aan de slag!</button>
            </div>
            <div class="column50">
              <div id="placeholder" style="width:100%; height:100%; background:#ccc; text-align:center; font-size:20px; cursor:pointer; line-height: 8; border-radius: 20px;">
                <p style="margin: auto; height: 100%;">Video placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 A720,70 0 0,0 1440,0 L1440,0 L0,0 Z" fill="#031F67" />
      </svg>
    </div>
    <div v-else>
      <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 A720,20 0 0,0 1440,0 L1440,0 L0,0 Z" fill="#031F67" />
      </svg>
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
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  console.log('ROUTE:', route)
  const isHome = computed(() => route?.name === 'home')
</script>