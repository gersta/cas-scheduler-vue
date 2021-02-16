<template>
  <div class="container mx-auto">
    <div class="text-2xl font-bold text-center">DHBW CAS Scheduler</div>

    <LectureList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LectureList from "./components/LectureList.vue";

@Options({
  components: {
    LectureList
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
