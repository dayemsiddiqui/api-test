// Home.vue
<template>
  <div>
    <nav-bar />
    <main-section />
  </div>
</template>

<script>
import NavBar from './NavBar'
import MainSection from './MainSection'
export default {
  name: 'App',
  components: {
    NavBar,
    MainSection
  }
}
</script>
