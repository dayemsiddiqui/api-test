// Home.vue
<template>
  <div>
    <div class="row">
      <div class="container">
          <mid-section-nav/>
          <api-list />
      </div>
    </div>
  </div>
</template>

<script>
import MidSectionNav from './MidSectionNav'
import ApiList from './ApiList'

export default {
  name: 'App',
  components: {
    MidSectionNav,
    ApiList
  }
}
</script>
