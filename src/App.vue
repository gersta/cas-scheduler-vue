<template>
  <div class="max-w-md mx-auto text-lg mb-4">
    DHBW CAS Scheduler
  </div>
  <LectureList />
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
