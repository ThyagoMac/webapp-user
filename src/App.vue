<template>
  <div id="app">
    <my-menu :menuroutes="routes" />

    <transition name='page'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {
  name: 'App',
  components: {
    'my-menu' : Menu
  },
  data() {
      return {
        routes : routes.filter(route => route.menu)
      }
    },
    methods: {
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -10px;
}

.page-enter, .page-leave-active {
    opacity: 0;
  }

.page-enter-active {
  transition: opacity 0.5s;
}
.page-leave-active {
  transition: opacity 0.3s;
}

</style>
