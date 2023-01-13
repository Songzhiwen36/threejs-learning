<script setup>
</script>

<template>
  <div class="app">
    <nav>
      <router-link class="link" to="/">章节01</router-link>
      <router-link class="link" to="/chapter02">章节02</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app {
  nav {
    margin-left: 80px;
    height: 48px;
    background-color: black;
    display: flex;
    .link {
      line-height: 48px;
      color: #FFFFFF;
      margin-left: 20px;
    }
  }
}
</style>
