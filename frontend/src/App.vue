<template>
  <header>
    <div class="outer-wrapper">
      <div class="wrapper">
        <nav>
          <ul class="desktop-nav">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">More About Me</RouterLink></li>
            <li><RouterLink to="/works">My Works</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
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
