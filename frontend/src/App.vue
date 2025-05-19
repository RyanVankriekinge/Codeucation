<template>
  <header>
    <div class="outer-wrapper desktop-nav">
      <div class="wrapper">
        <nav>
          <p class="logo">Codeucation</p>
          <ul>
            <li><router-link to="/">Handleiding</router-link></li>
            <li><router-link to="/">Log in</router-link></li>
          </ul>
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
