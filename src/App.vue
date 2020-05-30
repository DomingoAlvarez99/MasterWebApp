<template>
  <div id="app">
    <Nav></Nav>
    <SocialsSection></SocialsSection>
    <router-view></router-view>
  </div>

</template>

<script>
  import Nav from './components/Nav.vue'
  import SocialsSection from './components/SocialsSection.vue'
  export default {
    name: 'App',
    components: {
      Nav,
      SocialsSection
    }
  }
</script>
<style>
  @import './assets/css/styles.css';
  @import './assets/css/all.css';
</style>
